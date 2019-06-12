const botoes = document.querySelectorAll('.botao-som');
const botaoRec = document.querySelector('.botao-rec');
const botaoPlay = document.querySelector('.botao-play');
const audios = document.querySelectorAll('audio');
let gravando = false;
let sons = [];

Array.from(botoes).map((botao) => {
    botao.addEventListener('click', (e) => {       // EVENTO QUE FAZ SOM TOCAR AO CLICAR
        const audio = botao.firstElementChild;
        audio.play();

        if(gravando) {
            sons.push(audio);
        }
    });
    botao.addEventListener('dblclick', (e) => {   // EVENTO QUE FAZ SOM TOCAR EM LOOP AO CLICAR
        const audio = botao.firstElementChild;
        if (audio.loop) {
            audio.loop = false;
        }
        else {
            audio.loop = true;
            audio.play();
        }
    });
});

botaoRec.addEventListener('click', () => {  // EVENTO QUE FAZ ENTRA EM MODO DE GRAVAÇÃO
    if(gravando == false && sons.length > 0) {
        sons.splice(0,sons.length);
    }
    
    if (gravando) {
        gravando = false;
    }
    else {
        gravando = true;
    }
})

botaoPlay.addEventListener('click', () => { // EVENTO QUE FAZ SONS GRAVADOS TOCAREM EM SEQUÊNCIA
    sons[0].currentTime = 0;
    sons[0].play();

    for(let i = 0; i < sons.length; i++) {
        if(sons[i+1] !== undefined) {
            sons[i].addEventListener('ended', () => {
                sons[i+1].play();
            });
        }   
    }
}); 


    









// Exemplo de fazer som tocar ao pressionar botão

/*
window.addEventListener('keydown',(e) => {
    if(e.keyCode == 32) {
        Array.from(botoes)[0].firstElementChild.play();
    }
});
*/