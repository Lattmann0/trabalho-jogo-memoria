const imagens = [
    'assets/01.jpg',
    'assets/02.webp', 
    'assets/03.jpg', 
    'assets/04.webp',
    'assets/05.webp', 
    'assets/06.jpg', 
    'assets/07.jpg', 
    'assets/08.png'
];

let cartasArray = [...imagens, ...imagens]; // 8 pares
cartasArray = embaralhar(cartasArray);

const tabuleiro = document.getElementById('tabuleiro-jogo');
let cartasViradas = [];
let paresEncontrados = 0;
let cronometro;
let jogoIniciado = false;
let tempoPassado = 0;

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

cartasArray.forEach(imagem => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.imagem = imagem;
    carta.addEventListener('click', virarCarta);
    
    const img = document.createElement('img');
    img.src = imagem;
    carta.appendChild(img);
    
    tabuleiro.appendChild(carta);
});

function virarCarta() {
    if (!jogoIniciado) {
        jogoIniciado = true;
        iniciarCronometro();
    }

    if (cartasViradas.length < 2 && !this.classList.contains('virada')) {
        this.classList.add('virada');
        cartasViradas.push(this);

        if (cartasViradas.length === 2) {
            verificarPar();
        }
    }
}

function verificarPar() {
    const [carta1, carta2] = cartasViradas;

    if (carta1.dataset.imagem === carta2.dataset.imagem) {
        paresEncontrados++;
        cartasViradas = [];

        if (paresEncontrados === imagens.length) {
            clearInterval(cronometro);
            setTimeout(() => alert(`Você ganhou! Tempo: ${tempoPassado}s`), 500);
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
        }, 1000);
    }
}

function iniciarCronometro() {
    cronometro = setInterval(() => {
        tempoPassado++;
        document.getElementById('cronometro').innerText = `Tempo: ${tempoPassado}s`;
    }, 1000);
}
