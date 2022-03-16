// get elements
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

//images loading
const bird = new Image();
bird.src = './images/bird.png';
const bg = new Image();
bg.src = './images/bg.png';
const fg = new Image();
fg.src = './images/fg.png';
const pipeNorth = new Image();
pipeNorth.src = './images/pipeNorth.png';
const pipeSouth = new Image();
pipeSouth.src = './images/pipeSouth.png';

// loading audio
const fly = new Audio();
fly.src = './sounds/fly.mp3'
const hit = new Audio();
hit.src='./sounds/score.mp3'

// some variables
const gap = 75;
const constant = pipeNorth.height + gap;
const birdX = 10;
let birdY= 150;
const gravity = 1.5;
let score = 0;

// add event listener when pressing any key
document.addEventListener('keydown', moveUp)

// moving up function
function moveUp() {
    birdY -= 25;
    fly.play();
};

// pipes coordinates
const pipe=[];

pipe[0]={
    x: cvs.width,
    y: 0
}
// drawing function
function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i= 0; i<pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

        pipe[i].x--

        if (pipe[i].x === 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            })
        }
        // detecting collisions
        if(birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeNorth.width && (birdY <= pipe[i].y + pipeNorth.height || birdY+bird.height >= pipe[i].y+constant) || birdY + bird.height >=  cvs.height - fg.height ){
            ctx.fillStyle = '#000';
            ctx.font='40px Verdana';
            ctx.fillText('Game Over ', 10, 150);
            location.reload(); // reloading the page
        }
        if (pipe[i].x === 5){
            score ++;
            hit.play();
        } 
    }
    
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, birdX, birdY);
    birdY += gravity;

    ctx.fillStyle = '#000';
    ctx.font='20px Verdana';
    ctx.fillText('Score: '+score, 10, cvs.height - 20);
    
    requestAnimationFrame(draw);

}


draw();

