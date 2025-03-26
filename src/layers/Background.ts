import { createImage } from "../functions.js";
import { SpriteElement } from "../types.js";
import { DynamicLayerState } from "../types.js";
import DynamicLayer from "./DynamicLayer.js";

export default class Background extends DynamicLayer {
  constructor(canvas: HTMLCanvasElement, spritePath: string) {
    super(canvas, spritePath);
  }

  protected initializeState(): DynamicLayerState {
    return {
      speed: 1,
      maxSpeed: 60,
      size: {
        height: this.canvas.height,
        width: this.canvas.width,
      },
      assets: {
        spritePath: this.spritePath,
      },
    };
  }

  protected initializeSprites(): Array<SpriteElement> {
    return [
      {
        image: createImage(this.state.assets.spritePath),
        position: {
          posX: 0,
          posY: this.canvas.height - this.state.size.height,
        },
        size: this.state.size,
      },
      {
        image: createImage(this.state.assets.spritePath),
        position: {
          posX: this.canvas.width,
          posY: this.canvas.height - this.state.size.height,
        },
        size: this.state.size,
      },
    ];
  }
}
