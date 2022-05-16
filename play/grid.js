const a = (2 * Math.PI) / 6;
const r = 50;

/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawGrid(ctx, width, height, highlights) {
  ctx.lineWidth = 1;

  const hexagons = getHexagons(width, height);

  for (const { x, y } of hexagons) {
    const highlight = highlights.find((hex) => hex.x === x && hex.y === y);
    drawHexagon(ctx, x, y, highlight);
  }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawHexagon(ctx, x, y, highlight) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
  }
  ctx.closePath();
  if (highlight) {
    ctx.fillStyle = "whitesmoke";
    ctx.fill();
  }
  ctx.strokeStyle = "black";
  ctx.stroke();
}

export function getHexagons(width, height) {
  const hexagons = [];
  for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
    for (
      let x = r, j = 0;
      x + r * (1 + Math.cos(a)) < width;
      x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)
    ) {
      hexagons.push({ x, y });
    }
  }
  return hexagons;
}

export function hexagonForPoint(x, y, width, height) {
  const hexagons = getHexagons(width, height);
  for (const { x: hexX, y: hexY } of hexagons) {
    if (Math.abs(x - hexX) < r && Math.abs(y - hexY) < r * Math.sin(a)) {
      return { x: hexX, y: hexY };
    }
  }
  return null;
}
