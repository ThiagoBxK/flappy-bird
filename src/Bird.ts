import { createImage } from "./functions.js";
import { BirdAssets, BirdState } from "./types.js";
import Game from "./Game.js";

export default class Bird {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  Game: Game;
  state: BirdState;

  constructor(canvas: HTMLCanvasElement, Game: Game, assets: BirdAssets) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.Game = Game;
    this.state = {
      isNextFrameEnd: false,
      spriteIndex: 0,
      position: {
        posX: 24,
        posY: 24,
      },
      size: {
        width: 32 * 1.2,
        height: 24 * 1.2,
      },
      physics: {
        speed: 1,
        gravity: 0.1,
      },
      assets: {
        audios: assets.audios,
        sprites: assets.sprites.map((sprite) => createImage(sprite)),
      },
      collisions: [this.checkGroundCollision.bind(this)],
      events: {
        flap: () => this.flap(),
      },
    };
  }

  get frames() {
    return this.Game.state.frames;
  }

  flap() {
    this.state.physics.speed = -6;

    const audio = new Audio(this.state.assets.audios.flap);
    audio.play();
  }

  simulateGravity() {
    let { speed, gravity } = this.state.physics;
    speed += gravity;

    return {
      updateGravity: () => {
        this.state.physics.speed = speed;
        this.state.position.posY += this.state.physics.speed;
      },
      speed,
      gravity,
    };
  }

  fixOverlapCollisionY(object: any, collisionPosY: any) {
    const objectNextPosition = object.posY + (object.speed + object.gravity);
    const exceededDistance = objectNextPosition - collisionPosY;

    return {
      nextSpeed: object.speed - exceededDistance,
    };
  }

  checkGroundCollision() {
    const collisionPosY =
      this.canvas.height -
      this.state.size.height -
      this.Game.elements.ground.height;

    if (this.state.isNextFrameEnd) return true;
    else if (this.state.position.posY >= collisionPosY) {
      const { nextSpeed } = this.fixOverlapCollisionY(
        { ...this.state.position, ...this.state.physics },
        collisionPosY
      );

      this.state.physics.speed = nextSpeed;
      this.state.isNextFrameEnd = true;
    }

    return false;
  }

  checkCollisions() {
    for (const collision of this.state.collisions) return collision();
  }

  updateSprite() {
    if (this.frames % 8) return;

    this.state.spriteIndex =
      this.state.spriteIndex >= this.state.assets.sprites.length - 1
        ? 0
        : (this.state.spriteIndex += 1);
  }

  async updateFrame() {
    if (this.checkCollisions()) return this.Game.endGame();

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
