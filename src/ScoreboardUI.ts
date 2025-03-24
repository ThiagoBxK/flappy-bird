export default class ScoreboardUI {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: {
    isHidden: boolean;
    score: number;
    speed: number;
    position: {
      posY: number;
    };
    style: Partial<CanvasRenderingContext2D>;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = {
      isHidden: false,
      score: 0,
      speed: 1,
      position: {
        posY: 64,
      },
      style: {
        font: "48px Russo One, sans-serif",
        fillStyle: "#FFFFFF",
      },
    };
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async updateFrame() {
    this.render();
  }

  applyStyle() {
    for (const [key, value] of Object.entries(this.state.style)) {
      const contextKey = key as keyof CanvasRenderingContext2D;

      if (key in this.context) (this.context as any)[contextKey] = value;
    }
  }

  render() {
    if (this.state.isHidden) return;
    const text = String(this.state.score);

    this.applyStyle();
    const textWidth = this.context.measureText(text).width;
    const textCenter = this.canvas.width / 2 - textWidth / 2;

    this.context.fillText(text, textCenter, this.state.position.posY);
    this.context.strokeText(text, textCenter, this.state.position.posY);
  }
}
