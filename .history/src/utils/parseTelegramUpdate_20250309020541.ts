const botToken = process.env.TELEGRAM_BOT_TOKEN;

interface TelegramPhotoSize {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}

interface TelegramMessage {
  message_id?: number;
  text?: string;
  caption?: string;
  photo?: TelegramPhotoSize[];
  [key: string]: any; // Для других полей, которые могут быть в сообщении
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  [key: string]: any; // Для других полей, которые могут быть в апдейте
}

interface TelegramResponse {
  ok: boolean;
  result: TelegramUpdate[];
}

interface ProcessedMessage extends TelegramMessage {
  content: string; // Теперь text обязательное поле
  photo?: TelegramPhotoSize[]; // Добавляем новое поле для обработанной информации о фото
}

interface ProcessedUpdate extends TelegramUpdate {
  message: ProcessedMessage;
}


function parseUpdateData( data ){
  const processedUpdates: ProcessedUpdate[] = data.map(update => {
    const message = update.channel_post || {};
    const processedMessage: ProcessedMessage = {
      content: ""
    };

    if (message.text) {
      processedMessage.content = message.text;
    } else if (message.caption) {
      processedMessage.content = message.caption;
    }

    if(message.date){
      processedMessage.date = message.date
    }

    if (message.photo && Array.isArray(message.photo)) {
      processedMessage.photo = message.photo.map(photoItem => ({
        file_id: photoItem.file_id,
        file_unique_id: photoItem.file_unique_id,
        file_size: photoItem.file_size,
        width: photoItem.width,
        height: photoItem.height
      }));
    }

    return processedMessage
  });

  return processedUpdates;
}



export async function fetchChannelUpdate(offset = 0) {
  // TODO: ADD OFFSET
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates` // ?offset=${offset || 0}
    );
    
    const data: TelegramResponse = await response.json();

    if (data.ok) {
      const updates = data.result;
      const parsed = parseUpdateData(updates)
      console.log( parsed );

      return parsed;
    }
    
    return undefined;
}



async function downloadTelegramFile(fileId: string): Promise<Blob> {
  try {
    const getFileUrl = `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`;
    const response = await fetch(getFileUrl);
    const data = await response.json();
    
    if (!data.ok || !data.result?.file_path) {
      throw new Error(`Failed to get file info: ${data.description || 'Unknown error'}`);
    }
    
    const filePath = data.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;
    
    const fileResponse = await fetch(fileUrl);
    
    if (!fileResponse.ok) {
      throw new Error(`Failed to download file: ${fileResponse.statusText}`);
    }
    
    return await fileResponse.blob();
  } catch (error) {
    console.error('Error downloading Telegram file:', error);
    throw error;
  }
}

async function displayTelegramImage(token: string, fileId: string) {
  try {
    const blob = await downloadTelegramFile(token, fileId);
    
    const imageUrl = URL.createObjectURL(blob);
    
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    document.body.appendChild(imgElement);
    
    // Remember to revoke the URL when done to free memory
    return () => URL.revokeObjectURL(imageUrl);
  } catch (error) {
    console.error('Error displaying image:', error);
  }
}