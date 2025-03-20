import { Position, Size } from "./types";

export async function createImage(
  imagePath: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    console.log(`criando ${imagePath}`);

    const image = new Image();
    image.src = imagePath;

    image.onload = (event) => resolve(image);
    image.onerror = (error) => reject(error);
  });
}
