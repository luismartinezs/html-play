function main() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  function drawSquare(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
  }

  function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawPolygon(x, y, radius, sides, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      ctx.lineTo(
        x + radius * Math.cos((2 * Math.PI * i) / sides),
        y + radius * Math.sin((2 * Math.PI * i) / sides)
      );
    }
    ctx.closePath();
    ctx.fill();
  }

  function displayImage(x, y, image) {
    ctx.drawImage(image, x, y);
  }

  function renderText(x, y, text, color) {
    ctx.fillStyle = color;
    ctx.font = "30px Arial";
    ctx.fillText(text, x, y);
  }

  drawSquare(0, 0, 100, `hsl(${(360 / 6) * 0}, 90%, 50%)`);
  drawCircle(100, 100, 50, `hsl(${(360 / 6) * 4}, 90%, 50%)`);
  drawPolygon(200, 200, 50, 6, `hsl(${(360 / 6) * 2}, 90%, 50%)`);
  // const image = new Image();
  // image.src =
  //   "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg";
  // displayImage(100, 100, image);
  renderText(100, 100, "Hello World", "red");
}

main();
