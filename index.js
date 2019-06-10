const botoes = document.querySelectorAll('.botao-som');
const botaoRec = document.querySelector('.botao-rec');
const botaoPlay = document.querySelector('.botao-play');
const audios = document.querySelectorAll('audio');
let gravando = false;
let eventos = [];

Array.from(audios).map((audio) => {
    audio.preload = true;
});

Array.from(botoes).map((botao) => {
    botao.addEventListener('click', (e) => {
        const audio = botao.firstElementChild;
        audio.play();
        console.log(audio.play());
        if(gravando) {
            eventos.push(e);
        }
    });
    botao.addEventListener('dblclick', () => {
        const audio = botao.firstElementChild;
        if (audio.loop) {
            audio.loop = false;
        }
        else {
            audio.loop = true;
            audio.play();
        }
    });
})

botaoRec.addEventListener('click', () => {
    if(gravando == false && eventos.length > 0) {
        eventos.splice(0,eventos.length);
    }
    
    if (gravando) {
        gravando = false;
    }
    else {
        gravando = true;
    }
})


function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

botaoPlay.addEventListener('click', executar);

async function executar() {
    console.log(eventos);
    eventos.map((evento) => {
        evento.target.firstElementChild.currentTime = 0;
        evento.target.dispatchEvent(evento);
        if(evento.target.firstElementChild.currentTime == evento.target.firstElementChild.duration) {
            evento.target.firstElementChild.currentTime = 0;
        }
        wait(evento.target.firstElementChild.duration*1000);
    })
}









// Exemplo de fazer som tocar ao pressionar botão

/*
window.addEventListener('keydown',(e) => {
    if(e.keyCode == 32) {
        Array.from(botoes)[0].firstElementChild.play();
    }
});
*/