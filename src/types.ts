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

export type DynamicLayerState = {
  speed: number;
  maxSpeed: number;
  size: Size;
  assets: {
    spritePath: string;
  };
};
