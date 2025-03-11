import { readFile } from "fs/promises";

async function imageToBytes(imagePath: string) {
  const buffer = await readFile(imagePath);
  const bytes = new Uint8Array(buffer);
  return bytes;
}
