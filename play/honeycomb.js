var hexHeight,
  hexRadius,
  hexRectangleHeight,
  hexRectangleWidth,
  hexagonAngle = 0.523598776, // 30 degrees in radians
  sideLength = 20,
  hexHeight = Math.sin(hexagonAngle) * sideLength;

hexRadius = Math.cos(hexagonAngle) * sideLength;
hexRectangleHeight = sideLength + 2 * hexHeight;
hexRectangleWidth = 2 * hexRadius;

/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawHoneycomb(ctx, x, y, width, height) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "black";
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;

  var i, j, hexagons, xStart;
  //this loop generates a rectangular hexagon grid
  for (i = 0; i < height; i++) {
    hexagons = width - Math.abs(Math.floor(width / 2) - i);
    xStart =
      (width - 3) % 4 == 0
        ? Math.ceil((width - hexagons) / 2)
        : Math.floor((width - hexagons) / 2);

    for (j = xStart; j < xStart + hexagons; j++) {
      drawHexagon(
        ctx,
        j * hexRectangleWidth + (i % 2) * hexRadius,
        i * (sideLength + hexHeight),
        false
      );
    }
  }
  ctx.restore();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawHexagon(ctx, x, y, fill) {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;

  var fill = fill || false;

  ctx.beginPath();
  ctx.moveTo(x + hexRadius, y);
  ctx.lineTo(x + hexRectangleWidth, y + hexHeight);
  ctx.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
  ctx.lineTo(x + hexRadius, y + hexRectangleHeight);
  ctx.lineTo(x, y + sideLength + hexHeight);
  ctx.lineTo(x, y + hexHeight);
  ctx.closePath();

  if (fill) {
    ctx.fill();
  } else {
    ctx.stroke();
  }

  ctx.restore();
}
