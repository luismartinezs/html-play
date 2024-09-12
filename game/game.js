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
};

const keys = {};

const drawPlayer = () => {
  ctx.fillStyle = "hsl(60, 100%, 50%)";
  ctx.fillRect(player.x, player.y, player.width, player.height);
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

const update = () => {
  updatePlayerPosition();
  clearCanvas();
  drawPlayer();
  requestAnimationFrame(update);
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
