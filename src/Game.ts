import Background from "./layers/Background.js";
import Bird from "./Bird.js";
import Ground from "./layers/Ground.js";

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: {
    fps: number;
    frames: number;
    interval: undefined | number;
  };
  elements: {
    background: Background;
    ground: Ground;
    bird: Bird;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = {
      fps: 60,
      frames: 0,
      interval: undefined,
    };

    this.elements = {
      background: new Background(
        canvas,
        "./assets/sprites/scenario/default-day.jpg"
      ),
      ground: new Ground(canvas, "../assets/sprites/ground.jpg"),
      bird: new Bird(canvas),
    };
  }

  startGame(): void {
    this.state.interval = setInterval(
      () => this.updateFrame(),
      1000 / this.state.fps
    );
  }

  endGame(): void {
    clearInterval(this.state.interval);
  }

  updateFrame(): void {
    this.state.frames++;

    this.elements.background.updateFrame();
    this.elements.ground.updateFrame();
    this.elements.bird.updateFrame();
  }

  render(): void {
    this.elements.background.render();
    this.elements.ground.render();
    this.elements.bird.render();
  }
}
