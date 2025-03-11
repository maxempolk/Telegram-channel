import { Post } from "@/types/post";

interface TelegramResponse {
  ok: boolean;
  result: TelegramUpdate[];
}

interface TelegramUpdate {
  update_id: number;
  channel_post?: ChannelPost;
}

interface TelegramPhotoSize {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}

interface ChannelPost {
  message_id: number;
  caption?: string;
  text?: string;
  photo?: TelegramPhotoSize[];
}

interface ProcessedPost {
  message_id: number;
  caption?: string;
  text?: string;
  photo?: TelegramPhotoSize[];
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

function parseUpdateData(updates: TelegramResponse) {
  return updates.result.map(update => {
    const message = update.channel_post || {};
    
    const text = message.text || message.caption || "";
    const {title, content} = extractTitleAndContent(text)

    const processedMessage = {
      title: title,
      content: content,
    } as ChannelPost;

    // Обработка фотографий, если они есть
    if (message.photo && Array.isArray(message.photo)) {
      processedMessage.images = message.photo.map(({ file_id, file_unique_id, file_size, width, height }: TelegramPhotoSize) => ({
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
  });
}

title
content
images


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



// async function downloadTelegramFile(fileId: string): Promise<Blob> {
//   try {
//     const getFileUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`;
//     const response = await fetch(getFileUrl);
//     const data = await response.json();
    
//     if (!data.ok || !data.result?.file_path) {
//       throw new Error(`Failed to get file info: ${data.description || 'Unknown error'}`);
//     }
    
//     const filePath = data.result.file_path;
//     const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
    
//     const fileResponse = await fetch(fileUrl);
    
//     if (!fileResponse.ok) {
//       throw new Error(`Failed to download file: ${fileResponse.statusText}`);
//     }
    
//     return await fileResponse.blob();
//   } catch (error) {
//     console.error('Error downloading Telegram file:', error);
//     throw error;
//   }
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