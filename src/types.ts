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

export type GameState = {
  fps: number;
  frames: number;
  speed: number;
  interval: number | undefined;
};

export type BirdAssets = {
  audios: Record<string, string>;
  sprites: Array<string>;
};

export type BirdState = {
  isNextFrameEnd: boolean;
  spriteIndex: number;
  position: Position;
  size: Size;
  physics: {
    speed: number;
    gravity: number;
  };
  assets: {
    audios: Record<string, string>;
    sprites: Array<Promise<HTMLImageElement>>;
  };
  collisions: Array<() => boolean>;
  events: Record<string, () => any>;
};
