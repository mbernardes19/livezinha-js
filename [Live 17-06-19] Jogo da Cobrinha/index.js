// ====== CONFIGURAÇÃO E VARIÁVEIS DO CANVAS
const CANVAS_WIDTH = document.documentElement.clientWidth;
const CANVAS_HEIGHT = document.documentElement.clientHeight;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.setAttribute('width', CANVAS_WIDTH);
canvas.setAttribute('height', CANVAS_HEIGHT);
canvas.style.backgroundColor = 'white';
// =======================================

// ====== VARIÁVEIS GLOBAIS
let tamanho = 5;
let cobra = [{x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT/2}];
let dX = 20;
let dY = 0;
let movendoDir = true;
let movendoEsq = false;
let movendoCima = false;
let movendoBaixo = false;
let limiteCima = false;
let limiteBaixo = false;
let limiteDir = false;
let limiteEsq = false;
let isGameOver = false;
// ===========================

// ====== EVENT LISTENER PARA TECLAS
window.addEventListener('keydown', (e) => {
    console.log(e);
    if(e.code === "ArrowUp" && !movendoBaixo){
        dX = 0;
        dY = -20;
        movendoCima = true;
        movendoDir = false;
        movendoEsq = false;
        movendoBaixo = false;
    }
    if(e.code === "ArrowDown" && !movendoCima){
        dX = 0;
        dY = 20;
        movendoCima = false;
        movendoDir = false;
        movendoEsq = false;
        movendoBaixo = true;
    }
    if(e.code === "ArrowRight" && !movendoEsq){
        dX = 20;
        dY = 0;
        movendoDir= true;
        movendoCima = false;
        movendoEsq = false;
        movendoBaixo = false;
    }
    if(e.code === "ArrowLeft" && !movendoDir){
        dX = -20;
        dY = 0;
        movendoEsq= true;
        movendoCima = false;
        movendoDir = false;
        movendoBaixo = false;
    }
});
// ==========================

//====== EXECUÇÃO DO JOGO
criarCobra();
desenharCobra();
mover();

setInterval(() => {
    if(!isGameOver){
        mover();
    }
},200);
//========================

//========== FUNÇÕES
function checarLimite(){

    if(cobra[0].y <= 0){
        limiteCima = true;
        movendoCima = false;
        return false;
    }
    if(cobra[0].y >= CANVAS_HEIGHT-50){
        limiteBaixo = true;
        movendoBaixo = false;
        return false;
    }
    if(cobra[0].x <= 0){
        limiteEsq = true;
        movendoEsq = false;
        return false;
    }
    if(cobra[0].x >= CANVAS_WIDTH-50){
        limiteDir = true;
        movendoDir = false;
        return false;
    }
    else {
        return true;
    }
}

function gameOver(){
    const gameOver = document.getElementById('game-over');
    gameOver.style.display = 'block';
    gameOver.style.top = CANVAS_HEIGHT/2+'px';
    gameOver.style.left = CANVAS_WIDTH/2+'px';
}

function reset(){
    cobra = [{x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT/2}];
    criarCobra();
    desenharCobra();
}

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
    if(checarLimite()){
        cobra.unshift({x:cobra[0].x+dX, y:cobra[0].y+dY});
        cobra.pop();    
        limparTela();
        desenharCobra();
    }
    else {
        isGameOver = true;
        gameOver();
    }
    
    

}
// =========================