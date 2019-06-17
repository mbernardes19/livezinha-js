const CANVAS_WIDTH = document.documentElement.clientWidth;
const CANVAS_HEIGHT = document.documentElement.clientHeight;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.setAttribute('width', CANVAS_WIDTH);
canvas.setAttribute('height', CANVAS_HEIGHT);
canvas.style.backgroundColor = 'white';

let tamanho = 5;
let cobra = [{x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT/2}];

window.addEventListener('keydown', (e) => {
    console.log(e);
});

function desenharCobra() {
    cobra.forEach((parte) => {
        ctx.strokeStyle='black';
        ctx.fillStyle = 'green';
        ctx.fillRect(parte.x, parte.y, 20, 20);
        ctx.strokeRect(parte.x, parte.y, 20, 20)
    });
}

function criarCobra() {
    for(let i = 0; i<tamanho-1 ;i++) {
        const novaParte = {x: cobra[0].x - (20 * (i+1)), y: cobra[0].y};
        cobra.push(novaParte);
    }
}

function limparTela(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
}

function mover() {
    cobra.unshift({x:cobra[0].x+20, y:cobra[0].y});
    cobra.pop();
    limparTela() 
    desenharCobra();
}


criarCobra();
desenharCobra();
mover();

setInterval(() => {
    mover();
},200);
