export function arrayBufferToBase64(buffer: Uint8Array): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  console.log({
    typeof: typeof buffer,
    constructor: buffer.constructor?.name,
    isArrayBuffer: buffer instanceof ArrayBuffer,
    isTypedArray: ArrayBuffer.isView(buffer),
    hasBuffer: 'buffer' in buffer,
    hasByteLength: 'byteLength' in buffer,
    prototype: Object.prototype.toString.call(buffer)
  });

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  if (typeof window !== 'undefined') {
    return window.btoa(binary);
  } else {
    console.log( 123 );
    return Buffer.from(binary, 'binary').toString('base64');
  }
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