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
  text: string; // Теперь text обязательное поле
  photo?: TelegramPhotoSize[]; // Добавляем новое поле для обработанной информации о фото
}

interface ProcessedUpdate extends TelegramUpdate {
  message: ProcessedMessage;
}


function parseUpdateData( data ){
  const processedUpdates: ProcessedUpdate[] = data.map(update => {
    const message = update.channel_post || {};
    const processedMessage: ProcessedMessage = {
      text: ""
    };

    // Проверка наличия текста, если нет - используем caption (если доступен)
    if (message.text) {
      processedMessage.text = message.text;
    } else if (message.caption) {
      processedMessage.text = message.caption;
    }

    // Обработка информации о фото, если доступна
    if (message.photo && Array.isArray(message.photo)) {
      processedMessage.photoInfo = message.photo.map(photoItem => ({
        file_id: photoItem.file_id,
        file_unique_id: photoItem.file_unique_id,
        file_size: photoItem.file_size,
        width: photoItem.width,
        height: photoItem.height
      }));
    }

    return {
      message: processedMessage
    } as ProcessedUpdate;
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

      return parsed;
    }
    
    return undefined;
}