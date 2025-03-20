import { createImage } from "./functions.js";
import { Position, Size } from "./types.js";

export default class Bird {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  loop: undefined | number;
  groundColision: {
    check: (position: Position) => boolean;
  };
  state: {
    image: Promise<HTMLImageElement>;
    velocity: number;
    gravity: number;
    position: Position;
    size: Size;
    startLoop: () => any;
    endLoop: () => any;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.loop = undefined;
    this.state = {
      // image: createImage("../placeholder/sprites/bird/upflap.png"),

      image: createImage("../placeholder/bird.jpg"),
      velocity: 1,
      gravity: 0.1,
      position: {
        posX: 0,
        posY: 0,
      },
      size: {
        height: 24,
        width: 32,
      },
      startLoop: () => {
        this.loop = setInterval(() => this.updateFrame(), 16.66666);
      },
      endLoop: () => {
        clearInterval(this.loop);
        this.render();
      },
    };

    // TEMPORARIO | TEMPORARY //
    this.groundColision = {
      check: (position: Position) => {
        const bottomPositionY = 72 + 24;

        if (this.state.position.posY >= this.canvas.height - bottomPositionY)
          return true;

        const nextGravity = this.simulateGravity();
        const nextPositionY = this.state.position.posY + nextGravity.velocity;

        if (nextPositionY + bottomPositionY >= this.canvas.height) {
          const groundDistance =
            this.canvas.height - (this.state.position.posY + bottomPositionY);

          this.state.velocity -= nextGravity.velocity - groundDistance;
        }

        return false;
      },
    };
  }

  handleClickEvent(event: MouseEvent) {
    this.state.velocity = -5;
  }

  simulateGravity() {
    let { velocity, gravity } = this.state;

    velocity += gravity;

    return {
      setup: () => {
        this.state.velocity = velocity;
        this.state.position.posY += this.state.velocity;
      },
      velocity,
      gravity,
    };
  }

  updateFrame() {
    this.simulateGravity().setup();
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
