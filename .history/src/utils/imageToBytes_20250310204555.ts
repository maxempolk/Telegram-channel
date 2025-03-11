export function arrayBufferToBase64(buffer: Uint8Array): string {
  console.log( buffer )
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  return typeof window !== 'undefined' 
    ? window.btoa(binary)
    : Buffer.from(binary, 'binary').toString('base64');
}

// Интерфейс для файлов с содержимым
export interface FileWithContent {
  content: Uint8Array;
  mimeType: string;
}

export function createImageSrc(file: FileWithContent): string {
  const base64 = arrayBufferToBase64(file.content);
  const dataUrl = `data:${file.mimeType};base64,${base64}`;
  return dataUrl;
}