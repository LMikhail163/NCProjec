const canvas = document.getElementById('canvas');
const  content = canvas.getContext('2d');

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

const fly = new Audio();
const score = new Audio();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
fly.src = "audio/fly.mp3";
score.src = "audio/score.mp3";

// Позиция птички 
const xPos = 10;
      yPos = 200;

// Расстояние между трубами 
const gap = 90;

// Полет пртички 
document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos -= 30;
}

// Создание блоков 
const pipe = [];
pipe[0] = {
    x : canvas.width,
    y : 0
};

// Прорисовка 
function draw() {
    content.drawImage(bg, 0 , 0);

    for(var i = 0; i < pipe.length; i++) {
        content.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        content.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;
    }
    content.drawImage(bird, xPos, yPos);
    content.drawImage(fg, 0, canvas.height - fg.height);

    yPos += 1;
    requestAnimationFrame(draw);
}

// Прорисовка после того, как загрузится нижняя труба(последний элемент)
pipeBottom.onload = draw;