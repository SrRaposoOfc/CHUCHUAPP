// Configurações
const CONFIG = {
    countdownDate: '2023-06-27T00:00:00',
    heartRainInterval: 200,
    heartDuration: 3000,
    imageRotation: 270,
    imageSize: 270,
    spotifyLink: 'https://open.spotify.com/track/2p3QvyvrdHGntOeBwQNJQP?si=416bd0c37dfe4c92'
};

// Elementos DOM
const elements = {
    container: document.querySelector('.container'),
    photoContainer: document.getElementById('photo-container'),
    footer: document.getElementById('footer'),
    revealButton: document.getElementById('reveal-btn'),
    spotifyLink: document.getElementById('spotify-link'),
    title: document.getElementById('page-title'),
    countdown: document.getElementById('countdown'),
    hearts: document.getElementById('hearts'),
    photo: document.getElementById('photo')
};

// Inicialização dos eventos
function initializeEvents() {
    elements.revealButton.addEventListener('click', handleReveal);
    elements.photo.addEventListener('click', () => window.location.href = CONFIG.spotifyLink);
}

// Manipuladores de eventos
function handleReveal() {
    fadeOutInitialElements();
    setTimeout(showMainContent, 1000);
}

// Funções de animação
function fadeOutInitialElements() {
    const fadeOutTransition = 'opacity 1s ease';
    elements.container.style.transition = fadeOutTransition;
    elements.container.style.opacity = '0';
    elements.revealButton.style.transition = fadeOutTransition;
    elements.revealButton.style.opacity = '0';
}

function showMainContent() {
    elements.container.style.display = 'none';
    elements.revealButton.style.display = 'none';
    elements.photoContainer.style.display = 'block';
    elements.footer.style.display = 'block';
    elements.spotifyLink.style.display = 'block';
    elements.title.classList.add('show-title');

    rotateImage(CONFIG.imageRotation);
    resizeImage(CONFIG.imageSize);
    
    startCountdown(CONFIG.countdownDate);
    startHeartRain();
}

// Sistema de chuva de corações
function startHeartRain() {
    setInterval(createHeart, CONFIG.heartRainInterval);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    Object.assign(heart.style, {
        position: 'absolute',
        fontSize: '30px',
        left: `${Math.random() * window.innerWidth}px`,
        top: '-50px',
        animation: 'fall 3s linear forwards'
    });

    elements.hearts.appendChild(heart);
    setTimeout(() => heart.remove(), CONFIG.heartDuration);
}

// Sistema de contagem regressiva
function startCountdown(targetDate) {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = now - target;

        if (distance < 0) {
            clearInterval(interval);
            elements.countdown.innerHTML = "A data chegou! 💖";
            return;
        }

        elements.countdown.innerHTML = formatTimeDistance(distance);
    }, 1000);
}

function formatTimeDistance(distance) {
    const times = {
        years: Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25)),
        months: Math.floor((distance % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44)),
        days: Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };

    return `${times.years} anos, ${times.months} meses, ${times.days} dias, ${times.hours} horas, ${times.minutes} minutos, ${times.seconds} segundos.`;
}

// Funções de manipulação da imagem
function rotateImage(degrees) {
    elements.photo.style.transition = 'transform 1s ease';
    elements.photo.style.transform = `rotate(${degrees}deg)`;
}

function resizeImage(size) {
    elements.photo.style.width = `${size}px`;
    elements.photo.style.height = 'auto';
}

// Inicializar
document.addEventListener('DOMContentLoaded', initializeEvents);