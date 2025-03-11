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

// Определение типа для обработанного сообщения
interface ProcessedMessage extends TelegramMessage {
  text: string; // Теперь text обязательное поле
  photoInfo?: TelegramPhotoSize[]; // Добавляем новое поле для обработанной информации о фото
}

interface ProcessedUpdate extends TelegramUpdate {
  message: ProcessedMessage;
}


function parseUpdateData( data ){
  const processedUpdates = data.result.map(update => {
    const message = update.message || {};
    const processedMessage = {
      ...update,
      message: {
        ...message
      }
    };
  
    // Check if there's text, if not use caption (if available)
    if (message.text) {
      processedMessage.message.text = message.text;
    } else if (message.caption) {
      processedMessage.message.text = message.caption;
    } else {
      processedMessage.message.text = "";
    }
  
    // Process photo information if available
    if (message.photo && Array.isArray(message.photo)) {
      processedMessage.message.photoInfo = message.photo.map(photoItem => ({
        file_id: photoItem.file_id,
        file_unique_id: photoItem.file_unique_id,
        file_size: photoItem.file_size,
        width: photoItem.width,
        height: photoItem.height
      }));
    }
  
    return processedMessage;
  });
  
  console.log(processedUpdates);
}

export async function fetchChannelUpdate() {
  // ADD OFFSET
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset || 0}`
    );
    
    const data = await response.json();
    
    if (data.ok) {
      const updates = data.result;
      

      return new Response(
        JSON.stringify({ updates }), 
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: `Telegram API error: ${data.description || 'Unknown error'}` }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch updates';
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}