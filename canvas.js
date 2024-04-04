var canvas = document.getElementById("boardView");
var boardView = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var canvas2 = document.getElementById("playerView");
var playerView = canvas2.getContext("2d");
canvas2.height = window.innerHeight;
canvas2.width = window.innerWidth;

boardView.strokeStyle = "black";
boardView.textAlign = "center";
boardView.font = "20px Arial";

function drawCircle(ctx, x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function clearView(ctx) {
  ctx.clearRect(0, 0, canvas2.width, canvas2.height);
}

export { boardView, playerView, drawCircle, clearView };
