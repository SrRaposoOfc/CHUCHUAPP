let foods = [];
let isEating = false;

function getRandomPosition() {
    const margin = 100;
    return {
        x: margin + Math.random() * (window.innerWidth - 2 * margin),
        y: margin + Math.random() * (window.innerHeight - 2 * margin)
    };
}

function createFood() {
    const pos = getRandomPosition();
    const food = document.createElement('div');
    food.className = 'cat-food';
    food.textContent = '🐟';
    food.style.left = `${pos.x}px`;
    food.style.top = `${pos.y}px`;
    document.body.appendChild(food);
    
    food.style.animation = 'popIn 0.3s ease-out';
    
    return {
        element: food,
        x: pos.x,
        y: pos.y,
        eaten: false,
        eatingProgress: 0
    };
}

function addFood() {
    const food = createFood();
    foods.push(food);
    
    if (!isEating) {
        isEating = true;
        moveToNearestFood();
    }
}

function moveToNearestFood() {
    if (!window.neko || foods.length === 0) {
        isEating = false;
        return;
    }

    let nearestFood = null;
    let nearestDist = Infinity;
    
    for (let food of foods) {
        if (food.eaten) continue;
        
        const dist = Math.sqrt(
            Math.pow(window.nekoPosX - food.x, 2) + 
            Math.pow(window.nekoPosY - food.y, 2)
        );
        
        if (dist < nearestDist) {
            nearestDist = dist;
            nearestFood = food;
        }
    }
    
    if (!nearestFood) {
        isEating = false;
        return;
    }

    if (nearestDist < 50) {
        window.mousePosX = nearestFood.x;
        window.mousePosY = nearestFood.y;
        
        nearestFood.eatingProgress += 2;
        
        if (nearestFood.eatingProgress >= 20) {
            nearestFood.eaten = true;
            nearestFood.element.style.animation = 'fadeOut 0.3s forwards';
            
            setTimeout(() => {
                nearestFood.element.remove();
                foods = foods.filter(f => f !== nearestFood);
                
                setTimeout(() => {
                    moveToNearestFood();
                }, 200);
            }, 300);
            return;
        }
        
        const scale = 1 - (nearestFood.eatingProgress / 20) * 0.8;
        nearestFood.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        requestAnimationFrame(moveToNearestFood);
        return;
    }

    window.mousePosX = nearestFood.x;
    window.mousePosY = nearestFood.y;
    
    requestAnimationFrame(moveToNearestFood);
}

function createFoodButton() {
    const button = document.createElement('button');
    button.className = 'food-button';
    button.textContent = '🐟';
    button.title = 'Dar comida para o gatinho';
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
        addFood();
    });
}

document.addEventListener('DOMContentLoaded', createFoodButton); 