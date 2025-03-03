function createCelestialBodies() {
    // Criar o sol
    const sun = document.createElement('div');
    sun.className = 'celestial-body sun';
    sun.textContent = '☀️';
    sun.addEventListener('click', () => toggleTheme('dark'));
    document.body.appendChild(sun);

    // Criar a lua
    const moon = document.createElement('div');
    moon.className = 'celestial-body moon';
    moon.textContent = '🌙';
    moon.addEventListener('click', () => toggleTheme('light'));
    document.body.appendChild(moon);
}

function toggleTheme(newTheme) {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function createCloud() {
    if (document.documentElement.getAttribute('data-theme') !== 'light') return;

    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    
    // Alternar entre diferentes emojis de nuvem
    const cloudEmojis = ['☁️'];
    cloud.textContent = cloudEmojis[Math.floor(Math.random() * cloudEmojis.length)];
    
    // Posição vertical aleatória
    const startY = 50 + Math.random() * (window.innerHeight - 200);
    cloud.style.top = `${startY}px`;
    
    // Tamanho aleatório
    const size = 100 + Math.random() * 80;
    cloud.style.fontSize = `${size}px`;
    
    // Duração da animação
    const duration = 25 + Math.random() * 15;
    cloud.style.animationDuration = `${duration}s`;
    
    // Opacidade aleatória
    cloud.style.opacity = 0.6 + Math.random() * 0.4;
    
    document.body.appendChild(cloud);
    
    // Remover a nuvem depois que a animação terminar
    setTimeout(() => {
        cloud.remove();
    }, duration * 1000);
}

function startClouds() {
    createCelestialBodies();
    
    // Criar nuvens iniciais
    for(let i = 0; i < 3; i++) {
        setTimeout(createCloud, i * 1000);
    }
    
    // Continuar criando nuvens
    setInterval(createCloud, 4000);
}

document.addEventListener('DOMContentLoaded', startClouds); 