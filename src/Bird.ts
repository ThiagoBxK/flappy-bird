import { createImage, drawImage } from "./functions.js";
import { Position, Size } from "./types.js";

export default class Bird {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  interval: undefined | number;
  colisions: Array<{
    name: string;
    checkColision: (position: Position) => boolean;
  }>;
  state: {
    velocity: number;
    gravity: number;
    position: Position;
    size: Size;
    startGame: () => any;
    endGame: () => any;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.interval = undefined;
    this.state = {
      velocity: 3,
      gravity: 0.1,
      position: {
        posX: 0,
        posY: 0,
      },
      size: {
        height: 24,
        width: 24,
      },
      startGame: () => {
        this.interval = setInterval(() => this.updateFrame(), 16.66666);
      },
      endGame: () => {
        clearInterval(this.interval);
        this.render();
      },
    };

    this.colisions = [
      {
        name: "canva-bottom-colision",
        checkColision: (position: Position) => {
          const bottomPositionY = this.state.size.height;

          if (position.posY >= this.canvas.height - bottomPositionY)
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
      },
    ];
  }

  clearRect() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  checkColisions() {
    const colisions = this.colisions.filter((colision) =>
      colision.checkColision(this.state.position)
    );

    return colisions;
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
    const colisions = this.checkColisions();
    if (colisions.length) return this.state.endGame();

    this.simulateGravity().setup();

    this.render();
  }

  // TEMPORARIO // TEMPORARY //
  async render() {
    const context = this.context;
    const canvas = this.canvas;

    drawImage(
      context,
      "../placeholder/background.jpg",
      {
        posX: 0,
        posY: 0,
      },
      {
        height: canvas.height,
        width: canvas.width,
      }
    );

    drawImage(context, "../placeholder/bird.jpg", this.state.position, {
      height: 24,
      width: 32,
    });
  }
}
