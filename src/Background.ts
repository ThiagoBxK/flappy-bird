import { createImage } from "./functions.js";
import Game from "./Game.js";
import { SpriteElement } from "./types.js";

type Assets = {
  sprite: string;
};

export default class Background {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  sprites: Array<Promise<SpriteElement>>;
  game: Game;
  state: {
    assets: Assets;
  };

  constructor(canvas: HTMLCanvasElement, game: Game, assets: Assets) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.state = {
      assets: {
        sprite: assets.sprite,
      },
    };

    this.game = game;
    this.sprites = [
      this.createSprite({
        image: createImage(this.state.assets.sprite),
        position: {
          posX: 0,
          posY: this.canvas.height,
        },
        size: {
          height: this.canvas.height,
          width: this.canvas.width,
        },
      }),

      this.createSprite({
        image: createImage(this.state.assets.sprite),
        position: {
          posX: this.canvas.width,
          posY: this.canvas.height,
        },
        size: {
          height: this.canvas.height,
          width: this.canvas.width,
        },
      }),
    ];
  }

  get speed() {
    return this.game.state.speed;
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

      if (element.position.posX <= -this.canvas.width)
        element.position.posX = this.canvas.width;
    }
  }

  async updateFrame() {
    this.moveBackground(this.speed);
    await this.render();
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
