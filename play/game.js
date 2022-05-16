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
  hive.resize(w, h);
}

resize();
animate();
hive.init(5);
