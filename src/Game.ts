import Background from "./Background.js";
import Bird from "./Bird.js";
import Ground from "./Ground.js";
import { GameState } from "./types.js";

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: GameState;
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
      speed: 1,
      interval: undefined,
    };

    this.elements = {
      background: new Background(canvas, this, {
        sprite: "../assets/sprites/colors/red.jpg",
      }),
      ground: new Ground(canvas, this, {
        sprite: "../assets/sprites/colors/purple.jpg",
      }),
      bird: new Bird(canvas, this, {
        audios: {
          flap: "../assets/audios/flap.mp3",
        },
        sprites: [
          "../assets/sprites/colors/yellow.jpg",
          "../assets/sprites/colors/yellow.jpg",
          "../assets/sprites/colors/yellow.jpg",
        ],
      }),
    };
  }

  startGame() {
    this.state.interval = setInterval(
      () => this.updateFrame(),
      1000 / this.state.fps
    );
  }

  endGame() {
    clearInterval(this.state.interval);
    this.render();
  }

  async executeAction(
    action: "updateFrame" | "render",
    elements?: Array<string>
  ) {
    for await (const key of Object.keys(elements || this.elements)) {
      const element = this.elements[key as keyof typeof this.elements];

      element?.[action] && (await element[action]());
    }
  }

  async updateFrame() {
    this.state.frames++;
    this.executeAction("updateFrame");
  }

  async render() {
    this.executeAction("render");
  }
}
