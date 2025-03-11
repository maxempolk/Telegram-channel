const fs = require('fs').promises;

async function imageToBytes(imagePath) {
  const buffer = await fs.readFile(imagePath);
  const bytes = new Uint8Array(buffer);
  return bytes;
}
