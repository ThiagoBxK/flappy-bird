import { createImage } from "./functions.js";
import { Position, Size } from "./types.js";

export default class Ground {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  loop: undefined | number;
  state: {
    image: Promise<HTMLImageElement>;
    position: Position;
    size: Size;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.loop = undefined;
    this.state = {
      image: createImage("../placeholder/sprites/ground.png"),
      position: {
        posX: 0,
        posY: this.canvas.height - 72,
      },
      size: {
        height: 72,
        width: 380,
      },
    };
  }

  updateFrame() {
    this.render();
  }

  async render() {
    const image = await this.state.image;

    this.context.drawImage(
      image,
      this.state.position.posX,
      this.state.position.posY,
      this.state.size.width,
      this.state.size.height
    );
  }
}
