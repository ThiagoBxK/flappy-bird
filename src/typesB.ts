export type Position = {
  posX: number;
  posY: number;
};

export type Size = {
  height: number;
  width: number;
};

export type SpriteElement = {
  image: Promise<HTMLImageElement>;
  position: Position;
  size: Size;
};

export interface IDynamicLayer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: {
    speed: number;
    maxSpeed: number;
    size: Size;
    assets: {
      spritePath: string;
    };
  };
  sprites: Array<SpriteElement>;
  moveSprite: (sprite: SpriteElement, speed: number) => void;
  moveAllSprites: (speed: number) => void;
  drawSprite: (image: HTMLImageElement, position: Position, size: Size) => void;
  drawAllSprites: (speed: number) => void;
  updateFrame: () => void;
  render: () => void;
}
