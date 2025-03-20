import Background from "./Background.js";
import Bird from "./Bird.js";
import Ground from "./Ground.js";

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  loop: undefined | number;
  elements: {
    background: Background;
    ground: Ground;
    bird: Bird;
  };
  state: {
    speed: number;
    startLoop: () => any;
    endLoop: () => any;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.loop = undefined;

    this.state = {
      speed: 1,
      startLoop: () => {
        this.loop = setInterval(() => this.updateFrame(), 16);
      },
      endLoop: () => {
        clearInterval(this.loop);
        this.render();
      },
    };

    this.elements = {
      background: new Background(canvas, this),
      ground: new Ground(canvas, this),
      bird: new Bird(canvas, this),
    };
  }

  set speed(newSpeed: number) {
    this.elements.background.speed = newSpeed;
    this.elements.ground.speed = newSpeed;
  }

  start() {
    this.state.startLoop();
  }

  end() {
    this.state.endLoop();
  }

  async updateFrame() {
    await this.elements.background.updateFrame();
    await this.elements.ground.updateFrame();
    await this.elements.bird.updateFrame();
  }

  async render() {
    await this.elements.background.render();
    await this.elements.ground.render();
    await this.elements.bird.render();
  }
}
