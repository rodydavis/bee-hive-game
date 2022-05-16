export class Bee {
  size = { width: 30, height: 50 };
  offset = { x: 0, y: 0 };
  direction = [0, 0];
  color = { r: 0, g: 0, b: 0 };

  /**
   * @param {number} time
   */
  update(time) {
    const [dx, dy] = this.direction;

    this.offset.x += dx;
    this.offset.y += dy;
  }

  rect() {
    return {
      ...this.offset,
      ...this.size,
    };
  }

  up() {
    const [dx, dy] = this.direction;
    this.direction = [dx, -1];
  }

  down() {
    const [dx, dy] = this.direction;
    this.direction = [dx, 1];
  }

  left() {
    const [dx, dy] = this.direction;
    this.direction = [-1, dy];
  }

  right() {
    const [dx, dy] = this.direction;
    this.direction = [1, dy];
  }

  flipX() {
    const [dx, dy] = this.direction;
    this.direction = [-dx, dy];
  }

  flipY() {
    const [dx, dy] = this.direction;
    this.direction = [dx, -dy];
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  paint(ctx) {
    ctx.save();
    const { x, y } = this.offset;
    const { width, height } = this.size;
    ctx.translate(x, y);

    // Draw left and right wings as ovals
    ctx.fillStyle = "#eee";
    ctx.beginPath();
    ctx.ellipse(0, height / 2, width / 2, height / 3, 0, 0, Math.PI, true);
    ctx.ellipse(width, height / 2, width / 2, height / 3, 0, 0, Math.PI, true);
    ctx.fill();

    // Black outline
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw black oval body
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    ctx.fill();
    ctx.clip();

    // Yellow stripes across body
    ctx.fillStyle = "yellow";
    const size = 10;
    for (let i = 0; i < height / size; i++) {
      const dy = i * size;
      ctx.fillRect(0, dy, width, height / 8);
    }

    ctx.restore();

    // Black stroke
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw oval head with black outline
    ctx.beginPath();
    ctx.arc(width / 2, 0, width / 4, 0, Math.PI * 2);
    ctx.fillStyle = `white`;
    ctx.fill();
    ctx.strokeStyle = `black`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}
