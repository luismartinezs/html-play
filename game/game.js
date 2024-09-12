const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 512;

const player = {
  x: canvas.width / 2 - 15,
  y: canvas.height - 30,
  width: 10,
  height: 10,
  speed: 2,
  dx: 0,
  dy: 0,
  alive: true, // Add this line
};

let gameLoop = 0; // gameLoop is appox 200 = 1 second

const obstacles = [];

const keys = {};

const drawPlayer = () => {
  if (player.alive) {
    ctx.fillStyle = "hsl(60, 100%, 50%)";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const updatePlayerPosition = () => {
  if (keys['d']) player.dx = player.speed;
  else if (keys['a']) player.dx = -player.speed;
  else player.dx = 0;

  if (keys['w']) player.dy = -player.speed;
  else if (keys['s']) player.dy = player.speed;
  else player.dy = 0;

  player.x += player.dx;
  player.y += player.dy;

  // Prevent player from going off the canvas
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
};

function createObstacle() {
  const obstacle = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 10,
    height: 10,
    speed: 1 + Math.random() * 2
  };
  obstacles.push(obstacle);
}

function didPlayerCollideWithObstacle() {
  return obstacles.some((obstacle) => {
    return player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y;
  });
}

function updateObstacles() {
  obstacles.forEach((obstacle, index) => {
    obstacle.y += obstacle.speed;

    // Remove obstacle if it's off the screen
    if (obstacle.y > canvas.height) {
      obstacles.splice(index, 1);
    }

    // Check collision with player
    if (player.alive && didPlayerCollideWithObstacle()) {
      console.log("Collision detected!");
      player.alive = false; // Set player to not alive
    }
  });
}

const drawObstacles = () => {
  ctx.fillStyle = "hsl(0, 100%, 50%)"; // Red color for obstacles
  obstacles.forEach((obstacle) => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
};

const renderLoopLabel = () => {
  ctx.fillStyle = "white";
  ctx.font = "12px Arial";
  ctx.fillText(gameLoop, 10, 20);
};

/**
 * Determines whether an obstacle should be created based on the game loop count.
 *
 * @param {number} rateIncrease - A multiplier that affects the rate of obstacle creation.
 *                                Recommended values are between 1 and 100.
 *                                Higher values will decrease the frequency of obstacle creation.
 * @returns {boolean} - Returns true if an obstacle should be created, otherwise false.
 */
function shouldCreateObstacle(rateIncrease = 1) {
  return Math.random() < 0.02 * rateIncrease * gameLoop / 1000
}

const update = () => {
  gameLoop++;
  if (player.alive) {
    if (shouldCreateObstacle()) {
      createObstacle();
    }
    updateObstacles();
    updatePlayerPosition();
  }
  clearCanvas();
  drawObstacles();
  drawPlayer();
  renderLoopLabel();
  if (player.alive) {
    requestAnimationFrame(update);
  } else {
    console.log("Game Over");
    // You can add any additional game over logic here
  }
};

const handleKeyDown = (e) => {
  keys[e.key] = true;
};

const handleKeyUp = (e) => {
  keys[e.key] = false;
};

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

update();
