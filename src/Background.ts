import { createImage } from "./functions.js";
import { Position, Size } from "./types.js";

export default class Background {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: {
    spriteImage: Promise<HTMLImageElement>;
    position: Position;
    size: Size;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = {
      spriteImage: createImage(
        "../placeholder/sprites/scenarios/default-day.png"
      ),
      position: {
        posX: 0,
        posY: 0,
      },
      size: {
        height: this.canvas.height,
        width: this.canvas.width,
      },
    };
  }

  updateFrame() {
    this.render();
  }

  async render() {
    const spriteImage = await this.state.spriteImage;

    this.context.drawImage(
      spriteImage,
      this.state.position.posX,
      this.state.position.posY,
      this.state.size.width,
      this.state.size.height
    );
  }
}
