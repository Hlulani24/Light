let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
let player1 = {x: 100, y: 100, score: 0};
let player2 = {x: 700, y: 100, score: 0};
let bullets = [];

document.addEventListener('keydown', (event) => {
    switch(event.key){
        case '':
            bullets.push({x: player1.x, y: player1.y, velocity: 5});
            break;
            case 'Enter':
                bullets.push({x: player2.x, y:player2.y, velocity: -5});
                break;
    }
});

document.addEventListener('mousedown', (event) =>{
    let rect = canvas.getBoundingClientRect();
    player1.y = event.clientY - rect.top;
});

document.addEventListener('mousedown', (event) =>{
    bullets.push({x: player1.x, y: player1.y, velocity: 5});
});

canvas.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
    player2.y = event.clientY - rect.top;
});

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(player1.x, player1.y, 50, 50);
    ctx.fillStyle = 'red';
    ctx.fillRect(player2.x, player2.y, 50, 50);

    bullets.forEach((bullet, index) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(bullet.x, bullet.y, 10, 10);
        bullet.x += bullet.velocity;

        if(bullet.x > player2.x && bullet.x < player2.x + 50 && bullet.y > player2.y && bullet.y < player2.y + 50 && bullet.velocity > 0){
              player2.score++;
              document.getElementById('player2-score').innerText = 'player 2 score: ${player2.score}';
              bullets.splice(index, 1);
        }
        else if(bullet.x > player1 && bullet.x < player1.x + 50 && bullet.y > player1.y + 50 && bullet.velocity < 0){
            player1.score++;
            document.getElementById('Player1 Score').innerText = 'Player 1 Score: ${player1.score}';
            bullet.splice(index, 1);
        }

        if(bullet.x < 0 || bullet.x > canvas.width){
            bullets.splice(index, 1);
        }
    });
}, 16);


