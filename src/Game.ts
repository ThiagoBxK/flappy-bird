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
    startLoop: () => any;
    endLoop: () => any;
  };
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.loop = undefined;

    this.state = {
      startLoop: () => {
        this.loop = setInterval(() => this.updateFrame(), 16.66666);
      },
      endLoop: () => {
        clearInterval(this.loop);
        this.render();
      },
    };

    this.elements = {
      background: new Background(canvas),
      ground: new Ground(canvas),
      bird: new Bird(canvas),
    };

    // TEMPORARAY //
    canvas.addEventListener("click", (event) => {
      this.elements.bird.handleClickEvent(event);
    });
  }

  start() {
    this.state.startLoop();
  }

  checkColision() {
    if (
      this.elements.bird.groundColision.check(
        this.elements.ground.state.position
      )
    )
      this.handleDefeat();
  }

  handleDefeat() {
    this.state.endLoop();
  }

  updateFrame() {
    this.checkColision();
    this.elements.background.updateFrame();
    this.elements.bird.updateFrame();
    this.elements.ground.updateFrame();
  }

  async render() {
    await this.elements.background.render();
    await this.elements.bird.render();
    await this.elements.ground.render();
  }
}
