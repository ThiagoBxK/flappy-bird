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

export type Physics = {
  speed: number;
  gravity: number;
};

export type GravitySimulation = {
  applyGravity: () => void;
  speed: number;
  gravity: number;
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

export interface IBird {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  state: {
    spriteIndex: number;
    maxSpeed: number;
    position: Position;
    size: Size;
    physics: Physics;
  };
  sprites: Array<Promise<HTMLImageElement>>;
  moveSprite: (speed: number) => void;
  drawSprite: () => void;
  updateFrame: () => void;
  render: () => void;
  simulateGravity: () => GravitySimulation;
}
