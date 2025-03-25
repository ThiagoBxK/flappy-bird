import { createImage } from "./functions.js";
import { SpriteElement, Position, Size, IDynamicLayer } from "./typesB.js";

export default class Background implements IDynamicLayer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: {
    speed: number;
    maxSpeed: number;
    size: Size;
    assets: {
      spritePath: string;
    };
  };
  sprites: Array<SpriteElement>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = {
      speed: 1,
      maxSpeed: 60,
      size: {
        height: canvas.height,
        width: canvas.width,
      },
      assets: {
        spritePath: "../assets/sprites/scenario/default-day.jpg",
      },
    };

    this.sprites = [
      {
        image: createImage(this.state.assets.spritePath),
        position: {
          posX: 0,
          posY: canvas.height - this.state.size.height,
        },
        size: this.state.size,
      },
      {
        image: createImage(this.state.assets.spritePath),
        position: {
          posX: canvas.width,
          posY: canvas.height - this.state.size.height,
        },
        size: this.state.size,
      },
    ];
  }

  moveSprite(sprite: SpriteElement, speed: number): void {
    sprite.position.posX -= Math.min(speed, this.state.maxSpeed);

    if (sprite.position.posX <= -this.canvas.width)
      sprite.position.posX = this.canvas.width;
  }

  moveAllSprites(speed: number): void {
    for (const sprite of this.sprites) this.moveSprite(sprite, speed);
  }

  drawSprite(image: HTMLImageElement, position: Position, size: Size): void {
    this.context.drawImage(
      image,
      position.posX,
      position.posY,
      size.width,
      size.height
    );
  }

  async drawAllSprites(): Promise<void> {
    for await (const sprite of this.sprites) {
      const image = await sprite.image;
      this.drawSprite(image, sprite.position, sprite.size);
    }
  }

  updateFrame(): void {
    this.drawAllSprites();
    this.moveAllSprites(this.state.speed);
  }

  render(): void {
    this.drawAllSprites();
  }
}
