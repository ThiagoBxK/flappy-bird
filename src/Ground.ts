import { createImage } from "./functions.js";
import Game from "./Game.js";
import { SpriteElement } from "./types.js";

export default class Ground {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  sprites: Array<Promise<SpriteElement>>;
  state: {
    speed: number;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = {
      speed: 2,
    };

    this.sprites = [
      this.createSprite({
        image: createImage("../placeholder/purple.jpg"),
        position: {
          posX: 0,
          posY: this.canvas.height,
        },
        size: {
          height: 72,
          width: this.canvas.width,
        },
      }),

      this.createSprite({
        image: createImage("../placeholder/yellow.jpg"),
        position: {
          posX: this.canvas.width,
          posY: this.canvas.height,
        },
        size: {
          height: 72,
          width: this.canvas.width,
        },
      }),
    ];
  }

  async createSprite(sprite: SpriteElement) {
    return {
      image: sprite.image,
      position: {
        posX: sprite.position.posX,
        posY: sprite.position.posY - sprite.size.height,
      },
      size: sprite.size,
    };
  }

  async moveBackground(speed: number) {
    for (let sprite of this.sprites) {
      const element = await sprite;

      element.position.posX -= speed;

      if (element.position.posX <= -element.size.width)
        element.position.posX = this.canvas.width;
    }
  }

  updateFrame() {
    this.moveBackground(this.state.speed);
    this.render();
  }

  async render() {
    const sprites = await Promise.all(this.sprites.map((sprite) => sprite));

    for (const sprite of sprites) {
      const image = await sprite.image;

      this.context.drawImage(
        image,
        sprite.position.posX,
        sprite.position.posY,
        sprite.size.width,
        sprite.size.height
      );
    }
  }
}
