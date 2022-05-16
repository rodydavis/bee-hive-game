import { Bee } from "./bee.js";
import { drawGrid, hexagonForPoint } from "./grid.js";

export class Hive {
  /** @type {Bee[]} */
  bees = [];
  size = { width: 500, height: 500 };
  lastTime = 0;
  lastGenerate = 0;
  generateDuration = 1000 * 5 * 5;
  hexSize = 50;

  init(total = 0) {
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
    // Draw hexagon grid
    const { width, height } = this.size;

    const hexagons = [];
    for (const bee of this.bees) {
      const point = hexagonForPoint(
        bee.offset.x,
        bee.offset.y,
        this.size.width,
        this.size.height
      );
      if (point !== null) {
        hexagons.push(point);
      }
    }
    drawGrid(ctx, width, height, hexagons);

    for (const bee of this.bees) {
      bee.paint(ctx);
    }
  }
}
