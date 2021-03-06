import { Hive } from "./hive.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const count = document.getElementById("count");

let lastTime = 0;
let matrix = new DOMMatrix();

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

  // Set transform
  ctx.setTransform(matrix);

  // Move to center
  const hiveWidth = hive.size.width;
  const hiveHeight = hive.size.height;
  ctx.translate(
    canvas.width / 2 - hiveWidth / 2,
    canvas.height / 2 - hiveHeight / 2
  );

  hive.paint(ctx);
  ctx.restore();

  count.innerText = hive.bees.length;
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

function onWheel(e) {
  e.preventDefault();
  if (e.ctrlKey) {
    // Zoom
    const zoomDelta = -e.deltaY * 0.01;
    matrix = matrix.scale(1 + zoomDelta, 1 + zoomDelta);
  } else {
    // Pan
    matrix = matrix.translate(-e.deltaX, -e.deltaY);
  }
}

document.addEventListener("wheel", onWheel, {
  passive: false,
});

// Two finder pan move
document.addEventListener("touchmove", (e) => {
  e.preventDefault();
  // Min 2 fingers
  if (e.touches.length < 2) {
    return;
  }
  const touch1 = e.touches[0];
  const touch2 = e.touches[1];
  const x1 = touch1.clientX;
  const y1 = touch1.clientY;
  const x2 = touch2.clientX;
  const y2 = touch2.clientY;
  const dx = x2 - x1;
  const dy = y2 - y1;
  matrix = matrix.translate(-dx, -dy);
});

resize();
animate();
hive.init(1);
