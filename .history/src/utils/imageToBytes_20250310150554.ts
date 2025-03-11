import { readFile } from "fs/promises";

export async function imageToBytes(imagePath: string): Promise<Uint8Array> {
  try {
    const buffer: Buffer = await readFile(imagePath);
    const bytes: Uint8Array = new Uint8Array(buffer);
    return bytes;
  } catch (error) {
    console.error(`Ошибка при чтении файла: ${error}`);
    throw error;
  }
}

export function arrayBufferToBase64(buffer: Uint8Array) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  return window.btoa(binary);
}

export function createImageSrc(file) {
  const base64 = arrayBufferToBase64(file.content);
  const dataUrl = `data:${file.mimeType};base64,${base64}`;
  return dataUrl;
}