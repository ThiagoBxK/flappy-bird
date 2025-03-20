import { Position, Size } from "./types";

export async function createImage(
  imagePath: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imagePath;

    image.onload = (event) => resolve(image);
    image.onerror = (error) => reject(error);
  });
}

export async function drawImage(
  context: CanvasRenderingContext2D,
  imagePath: string,
  position: Position,
  size: Size
) {
  const image = await createImage(imagePath);

  context.drawImage(
    image,
    position.posX,
    position.posY,
    size.width,
    size.height
  );
}
