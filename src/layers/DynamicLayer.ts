import { DynamicLayerState, Position, Size, SpriteElement } from "../types";

export default abstract class DynamicLayer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: DynamicLayerState;
  sprites: Array<SpriteElement>;
  spritePath: string;

  constructor(canvas: HTMLCanvasElement, spritePath: string) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.spritePath = spritePath;

    this.state = this.initializeState();
    this.sprites = this.initializeSprites();
  }

  protected abstract initializeState(): DynamicLayerState;
  protected abstract initializeSprites(): Array<SpriteElement>;

  protected moveSprite(sprite: SpriteElement, speed: number): void {
    sprite.position.posX -= Math.min(speed, this.state.maxSpeed);

    if (sprite.position.posX <= -this.canvas.width)
      sprite.position.posX = this.canvas.width;
  }

  protected moveAllSprites(speed: number): void {
    for (const sprite of this.sprites) this.moveSprite(sprite, speed);
  }

  protected drawSprite(
    image: HTMLImageElement,
    position: Position,
    size: Size
  ): void {
    this.context.drawImage(
      image,
      position.posX,
      position.posY,
      size.width,
      size.height
    );
  }

  protected async drawAllSprites(): Promise<void> {
    for await (const sprite of this.sprites) {
      const image = await sprite.image;
      this.drawSprite(image, sprite.position, sprite.size);
    }
  }

  public updateFrame(): void {
    this.drawAllSprites();
    this.moveAllSprites(this.state.speed);
  }

  public render(): void {
    this.drawAllSprites();
  }
}
