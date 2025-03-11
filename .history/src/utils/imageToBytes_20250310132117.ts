import { readFile } from "fs/promises";

async function imageToBytes(imagePath: string): Promise<Uint8Array> {
  try {
    const buffer: Buffer = await readFile(imagePath);
    const bytes: Uint8Array = new Uint8Array(buffer);
    return bytes;
  } catch (error) {
    console.error(`Ошибка при чтении файла: ${error}`);
    throw error;
  }
}

export default imageToBytes;
