const canvas = document.getElementById('canvas');
const content = canvas.getContext('2d');
const btn = document.querySelector('button');

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

const fly = new Audio();
const scoreAudio = new Audio();
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
fly.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";

// Позиция птички 
let xPos = 10;
let yPos = 150;
let grav = 1.5;

let score = 0;

// Прорисовка после того, как загрузится нижняя труба(последний элемент)
pipeBottom.onload = draw;

// Расстояние между трубами 
const gap = 140;

// Полет птички 
document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

// Создание блоков 
const pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
};

// Прорисовка 
function draw() {
    content.drawImage(bg, 0, 0);
    content.drawImage(fg, 0, canvas.height - fg.height);
    for (let i = 0; i < pipe.length; i++) {
        content.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        content.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                
            });
        }

        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= canvas.height - fg.height) {
            content.fillText('Game over. Score: ' + score, 20, canvas.height - 220);
            fly.pause();
            cancelAnimationFrame();
        }

        if(pipe[i].x === 5) {
            score++;
            scoreAudio.play();
        }
    }
    content.drawImage(bird, xPos, yPos);
    yPos += grav;

    content.fillStyle = "#000";
    content.font = "24px Verdana";
    content.fillText("Score: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}
