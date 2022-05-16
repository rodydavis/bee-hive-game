import { Hive } from "./hive.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let lastTime = 0;

const hive = new Hive();

function animate(time = 0) {
  resize();
  update(time);
  paint(time);
  lastTime = time;
  requestAnimationFrame(animate);
}

function update(time) {
  hive.update(time);
}

function paint() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Background
  ctx.fillStyle = "yellow";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Move to center
  const hiveWidth = hive.size.width;
  const hiveHeight = hive.size.height;
  ctx.translate(
    canvas.width / 2 - hiveWidth / 2,
    canvas.height / 2 - hiveHeight / 2
  );

  hive.paint(ctx);
  ctx.restore();
}

function resize() {
  if (
    window.innerWidth === canvas.width &&
    window.innerHeight === canvas.height
  ) {
    return;
  }
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}

resize();
animate();
hive.init(1);
