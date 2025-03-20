import { createImage } from "./functions.js";
import Game from "./Game.js";
import { Position, Size } from "./types.js";

export default class Bird {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  sprite: {
    image: Promise<HTMLImageElement>;
    position: Position;
    size: Size;
  };
  state: {
    gravitySpeed: number;
    gravity: number;
  };
  game: Game;
  nextEnd: boolean;

  constructor(canvas: HTMLCanvasElement, game: Game) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.nextEnd = false;
    this.game = game;
    this.state = {
      gravitySpeed: 0,
      gravity: 0.1,
    };

    this.sprite = {
      image: createImage("../placeholder/black.jpg"),
      position: {
        posX: 24,
        posY: 24,
      },
      size: {
        height: 24,
        width: 32,
      },
    };
  }

  simulateGravity() {
    let { gravitySpeed, gravity } = this.state;
    gravitySpeed += gravity;

    return {
      updateGravity: () => {
        this.state.gravitySpeed = gravitySpeed;
        this.sprite.position.posY += this.state.gravitySpeed;
      },
      gravitySpeed,
      gravity,
    };
  }

  // GAMBIARRA TEMPORARIA //
  __temporary_groundColision() {
    if (this.nextEnd) return true;

    const bottomPositionY = this.sprite.size.height + 72;
    if (this.sprite.position.posY >= this.canvas.height - bottomPositionY)
      return true;

    const nextGravity = this.simulateGravity();
    const nextPositionY = this.sprite.position.posY + nextGravity.gravitySpeed;

    if (nextPositionY + bottomPositionY >= this.canvas.height) {
      this.nextEnd = true;
      const groundDistance =
        this.canvas.height - (this.sprite.position.posY + bottomPositionY);
      this.state.gravitySpeed -= nextGravity.gravitySpeed - groundDistance;
    }

    return false;
  }
  // -- -- -- -- -- --  //

  async updateFrame() {
    if (this.__temporary_groundColision()) return this.game.end();
    this.simulateGravity().updateGravity();
    this.render();
  }

  async render() {
    const image = await this.sprite.image;

    this.context.drawImage(
      image,
      this.sprite.position.posX,
      this.sprite.position.posY,
      this.sprite.size.width,
      this.sprite.size.height
    );
  }
}
