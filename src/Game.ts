import Bird from "./Bird.js";
import Background from "./layers/Background.js";
import Ground from "./layers/Ground.js";
import { GameElements, GameState, GameStatus } from "./types.js";

export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private state: GameState;
  private elements: GameElements;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = {
      interval: undefined,
      status: GameStatus.Menu,
      fps: 60,
      layerSpeed: 5,
      maxLayerSpeed: 60,
      physics: {
        speed: 1.5,
        gravity: 0.3,
      },
    };

    this.elements = {
      background: new Background(canvas, "./assets/sprites/background.jpg"),
      ground: new Ground(canvas, "../assets/sprites/ground.jpg"),
      bird: new Bird(canvas),
    };
  }

  private async executeAction(
    action: "updateFrame" | "render",
    elements: GameElements
  ) {
    for await (const key of Object.keys(elements || this.elements)) {
      const element = this.elements[key as keyof typeof this.elements];
      element?.[action] && element[action]();
    }
  }

  public startGame(): void {
    this.state.interval = setInterval(
      () => this.updateFrame(),
      1000 / this.state.fps
    );
  }

  public endGame(): void {
    clearInterval(this.state.interval);
  }

  public updateFrame(): void {
    this.executeAction("updateFrame", this.elements);
  }

  public render(): void {
    this.executeAction("render", this.elements);
  }
}
