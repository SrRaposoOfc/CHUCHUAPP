function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Posição aleatória
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    
    // Tamanho aleatório (entre 2px e 5px)
    const size = 2 + Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Duração aleatória da animação
    const duration = 2 + Math.random() * 3;
    star.style.setProperty('--duration', `${duration}s`);
    
    // Brilho extra para estrelas maiores
    if (size > 3.5) {
        star.style.boxShadow = `0 0 ${size * 2}px var(--text-color)`;
    }
    
    document.body.appendChild(star);
}

function createStarField() {
    // Criar 150 estrelas
    for (let i = 0; i < 150; i++) {
        createStar();
    }
}

document.addEventListener('DOMContentLoaded', createStarField); 