export function arrayBufferToBase64(buffer: Uint8Array): string {
  let binary = '';
  const bytes = new Uint8Array(Object.values(buffer));
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  if (typeof window !== 'undefined') {
    return window.btoa(binary);
  } else {
    return Buffer.from(binary, 'binary').toString('base64');
  }
}

export interface FileWithContent {
  content: Uint8Array;
  mimeType: string;
}

export function createImageSrc(file: FileWithContent): string {
  const base64 = arrayBufferToBase64(file.content);
  const dataUrl = `data:${file.mimeType};base64,${base64}`;
  return dataUrl;
}