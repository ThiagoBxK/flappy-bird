import { createImage } from "./functions.js";
import { GravitySimulation, Physics, Position, Size } from "./types.js";

export default class Bird {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: {
    spriteIndex: number;
    speed: number;
    maxSpeed: number;
    position: Position;
    size: Size;

    physics: Physics;
  };
  sprites: Array<Promise<HTMLImageElement>>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.state = {
      spriteIndex: 0,
      speed: 1,
      maxSpeed: 60,
      position: {
        posX: 24,
        posY: 24,
      },
      size: {
        height: 24 * 1.2,
        width: 32 * 1.2,
      },
      physics: {
        speed: 1.5,
        gravity: 0.3,
      },
    };

    this.sprites = [
      createImage("../assets/sprites/bird/up-flap.png"),
      createImage("../assets/sprites/bird/mid-flap.png"),
      createImage("../assets/sprites/bird/down-flap.png"),
    ];
  }

  simulateGravity(): GravitySimulation {
    let { speed, gravity } = this.state.physics;
    speed += gravity;

    return {
      applyGravity: () => {
        this.state.physics.speed = speed;
        this.state.position.posY += this.state.physics.speed;
      },
      speed,
      gravity,
    };
  }

  moveSprite(speed: number): void {
    const simulation = this.simulateGravity();
    simulation.applyGravity();
  }

  async drawSprite(): Promise<void> {
    const image = await this.sprites[this.state.spriteIndex];

    this.context.drawImage(
      image,
      this.state.position.posX,
      this.state.position.posY,
      this.state.size.width,
      this.state.size.height
    );
  }

  updateFrame(): void {
    this.moveSprite(this.state.speed);
    this.drawSprite();
  }

  render(): void {
    this.drawSprite();
  }
}
