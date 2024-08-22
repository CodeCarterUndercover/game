const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
let score = 0;
let basketWidth = 100;
let basketHeight = 20;
let basketX = (canvas.width - basketWidth) / 2;
let stars = [];
const starSize = 20;
let intervalId;
const basketSpeed = 10;
const starSpeed = 3;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener('mousemove', (e) => {
    basketX = e.clientX - basketWidth / 2;
});

function createStar() {
    const x = Math.random() * (canvas.width - starSize);
    const y = -starSize;
    stars.push({ x, y });
}

function drawBasket() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
}

function drawStars() {
    ctx.fillStyle = '#ff0';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x + starSize / 2, star.y + starSize / 2, starSize / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateStars() {
    stars.forEach(star => {
        star.y += starSpeed;
    });
    stars = stars.filter(star => star.y < canvas.height);
}

function checkCollision() {
    stars.forEach(star => {
        if (star.y + starSize > canvas.height - basketHeight &&
            star.x + starSize > basketX &&
            star.x < basketX + basketWidth) {
            score++;
            scoreDisplay.textContent = score;
            stars = stars.filter(s => s !== star);
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawStars();
    updateStars();
    checkCollision();
}

function gameLoop() {
    draw();
    intervalId = requestAnimationFrame(gameLoop);
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    stars = [];
    intervalId = requestAnimationFrame(gameLoop);
    setInterval(createStar, 1000);
}

window.onload = startGame;

