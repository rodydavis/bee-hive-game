import { Bee } from "./bee.js";
import { drawHoneycomb } from "./honeycomb.js";

export class Hive {
  /** @type {Bee[]} */
  bees = [];
  size = { width: 100, height: 100 };
  lastTime = 0;
  lastGenerate = 0;
  generateDuration = 1000 * 5 * 5;
  hexSize = 50;

  init(total = 100) {
    for (let i = 0; i < total; i++) this.addBee();
  }

  resize(width, height) {
    this.size = { width, height };
  }

  addBee() {
    const bee = new Bee();
    const { width, height } = this.size;
    bee.offset = {
      x: Math.random() * width,
      y: Math.random() * height,
    };
    bee.direction = [Math.random() * 2, Math.random() * 2];
    this.bees.push(bee);
    console.log("bees", this.bees.length);
    return bee;
  }

  /**
   *
   * @param {number} time
   */
  update(time) {
    const delta = time - this.lastTime;
    if (this.lastGenerate > this.generateDuration) {
      this.addBee();
      this.lastGenerate = 0;
    }
    const hiveWidth = this.size.width;
    const hiveHeight = this.size.height;

    for (const bee of this.bees) {
      const { x, y, width, height } = bee.rect();
      const [dx, dy] = bee.direction;
      const x2 = x + width;
      const y2 = y + height;
      if ((y2 > hiveHeight && dy > 0) || (y < 0 && dy < 0)) {
        bee.flipY();
      }
      if ((x2 > hiveWidth && dx > 0) || (x < 0 && dx < 0)) {
        bee.flipX();
      }
      bee.update(time);
    }

    this.lastGenerate += delta;
    this.lastTime = time;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  paint(ctx) {
    // Draw Background
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, this.size.width, this.size.height);

    // Draw hexagon grid
    const { width, height } = this.size;
    const size = 20;
    drawHoneycomb(ctx, width / 9, height / 11, size, size);

    for (const bee of this.bees) {
      bee.paint(ctx);
    }
  }
}
