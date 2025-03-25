import Background from "./Ground.js";
// import Bird from "./Bird.js";
// import Ground from "./Ground.js";
// import ScoreboardUI from "./ScoreboardUI.js";
import { GameState } from "./types.js";

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: GameState;
  elements: {
    background: Background;
    // ground: Ground;
    // bird: Bird;
    // scoreboardUI: ScoreboardUI;
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
      background: new Background(canvas, this),
    };

    // this.elements = {
    //   background: new Background(canvas, this, {
    //     sprite: "../assets/sprites/scenario/default-day.jpg",
    //     // sprite: "../assets/sprites/colors/blue.jpg",
    //   }),

    //   ground: new Ground(canvas, this, {
    //     sprite: "../assets/sprites/ground.jpg",
    //     // sprite: "../assets/sprites/colors/red.jpg",
    //   }),
    //   bird: new Bird(canvas, this, {
    //     audios: {
    //       flap: "../assets/audios/flap.mp3",
    //     },
    //     sprites: [
    //       // "../assets/sprites/colors/yellow.jpg",
    //       "../assets/sprites/bird/down-flap.png",
    //       "../assets/sprites/bird/mid-flap.png",
    //       "../assets/sprites/bird/up-flap.png",
    //     ],
    //   }),
    //   scoreboardUI: new ScoreboardUI(canvas),
    // };

    // Temporary
    // canvas.addEventListener("click", () => {
    //   this.elements.bird.flap();
    // });
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
