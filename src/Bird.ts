import { createImage } from "./functions.js";
import Game from "./Game.js";
import { Position, Size } from "./types.js";

type Assets = {
  audios: Record<string, string>;
  sprites: Array<string>;
};

export default class Bird {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: {
    isNextFrameEnd: boolean;
    spriteIndex: number;
    position: Position;
    size: Size;
    gravitySpeed: number;
    gravity: number;
    assets: {
      sprites: Array<Promise<HTMLImageElement>>;
    };
  };
  game: Game;

  constructor(canvas: HTMLCanvasElement, game: Game, assets: Assets) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.game = game;
    this.state = {
      isNextFrameEnd: false,
      position: {
        posX: 24,
        posY: 24,
      },
      size: {
        width: 32 * 1.2, // 1.2 as scale
        height: 24 * 1.2, // 1.2 as scale
      },
      gravitySpeed: 2,
      gravity: 4,
      spriteIndex: 0,
      assets: {
        sprites: assets.sprites.map((sprite) => createImage(sprite)),
      },
    };
  }

  get frames() {
    return this.game.state.frames;
  }

  simulateGravity() {
    let { gravitySpeed, gravity } = this.state;
    gravitySpeed += gravity;

    return {
      updateGravity: () => {
        this.state.gravitySpeed = gravitySpeed;
        this.state.position.posY += this.state.gravitySpeed;
      },
      gravitySpeed,
      gravity,
    };
  }

  checkGroundColision() {
    const colisionPosY = this.canvas.height - this.state.size.height - 72;
    const elementPosY = this.state.position.posY;
    const nextPositionY = elementPosY + this.simulateGravity().gravitySpeed;

    if (this.state.isNextFrameEnd) {
      this.state.position.posY = colisionPosY;
      return true;
    }

    if (nextPositionY >= colisionPosY) this.state.isNextFrameEnd = true;

    return false;
  }

  updateSprite() {
    if (this.frames % 8) return;

    this.state.spriteIndex =
      this.state.spriteIndex >= this.state.assets.sprites.length - 1
        ? 0
        : (this.state.spriteIndex += 1);
  }

  async updateFrame() {
    if (this.checkGroundColision()) return this.game.endGame();

    this.simulateGravity().updateGravity();
    this.updateSprite();
    this.render();
  }

  async drawSprite(spriteIndex: number) {
    const { position, size, assets } = this.state;
    const image = await assets.sprites[spriteIndex];

    this.context.drawImage(
      image,
      position.posX,
      position.posY,
      size.width,
      size.height
    );
  }

  async render() {
    await this.drawSprite(this.state.spriteIndex);
  }
}
