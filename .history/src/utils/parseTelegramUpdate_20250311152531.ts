import { lookup } from "mime-types";

export interface TelegramUpdate {
  update_id: number;
  channel_post?: ChannelPost;
}

interface TelegramPhoto {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}

interface ChannelPost {
  caption?: string;
  text?: string;
  photo?: TelegramPhoto[];
}

interface ProcessedPost {
  title: string;
  text: string;
  images?: TelegramPhoto[];
}

const extractTitleAndContent = (message: string) => {
  const lines = message.split("\n");
  
  const title = lines.length > 0 ? lines[0] : "";
  
  const content = lines.length > 1 ? lines.slice(1).join("\n") : "";
  
  return {
    title,
    content
  };
};

export function parseUpdateData(update: TelegramUpdate) {
  const message = update.channel_post;
  
  if (message === undefined) return

  const text = message.text || message.caption || "";
  const {title, content} = extractTitleAndContent(text)

  const processedMessage = {
    title: title,
    text: content,
    images: undefined
  } as ProcessedPost;

  if (message.photo && Array.isArray(message.photo)) {
    processedMessage.images = message.photo.map(({ file_id, file_unique_id, file_size, width, height }: TelegramPhoto) => ({
      file_id,
      file_unique_id,
      file_size,
      width,
      height
    }));
  }

  return {
    message: processedMessage
  };
}

interface FileType{
  filename: string
  mimeType: string
  size: number
  content: Promise<Blob>
}

interface fileRequestResult{
  file_id: string
  file_unique_id: string
  file_size: number
  file_path: string
}

interface fileRequest{
  ok: boolean,
  result:fileRequestResult
}

export async function downloadTelegramFile(fileId: string): FileType{
  const botToken = process.env.TELEGRAM_BOT_TOKEN; 

  try {
    const getFileUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`;
    const response = await fetch(getFileUrl);
    const data = await response.json();
    
    if (!data.ok || !data.result?.file_path) {
      throw new Error(`Failed to get file info: ${data.description || 'Unknown error'}`);
    }
    
    const filePath = data.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
    
    const fileResponse = await fetch(fileUrl);
    
    if (!fileResponse.ok) {
      throw new Error(`Failed to download file: ${fileResponse.statusText}`);
    }
    
    return {
      filename: data.result.file_path,
      content: await fileResponse.blob(),
      size: data.result.size
    };
  } catch (error) {
    console.error('Error downloading Telegram file:', error);
    throw error;
  }
}

export function getMimeType(filename: string): string {
  // Возвращает MIME-тип или 'application/octet-stream' если тип не определен
  return lookup(filename) || 'application/octet-stream';
}


// export async function fetchChannelUpdate(offset = 0) {
//   // TODO: ADD OFFSET
//     const response = await fetch(
//       `https://api.telegram.org/bot${botToken}/getUpdates` // ?offset=${offset || 0}
//     );
    
//     const data: TelegramResponse = await response.json();

//     if (data.ok) {
//       const updates = data.result;
//       const parsed = parseUpdateData(updates)

//       return parsed;
//     }
    
//     return undefined;
// }


// async function displayTelegramImage(fileId: string) {
//   try {
//     const blob = await downloadTelegramFile(fileId);
    
//     const imageUrl = URL.createObjectURL(blob);
    
//     const imgElement = document.createElement('img');
//     imgElement.src = imageUrl;
//     document.body.appendChild(imgElement);
    
//     // Remember to revoke the URL when done to free memory
//     return () => URL.revokeObjectURL(imageUrl);
//   } catch (error) {
//     console.error('Error displaying image:', error);
//   }
// }