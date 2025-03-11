import {readFile} from "fs"

async function imageToBytes(imagePath) {
  const buffer = await readFile(imagePath);
  const bytes = new Uint8Array(buffer);
  return bytes;
}
