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
  photoInfo?: TelegramPhotoSize[]; // Добавляем новое поле для обработанной информации о фото
}

interface ProcessedUpdate extends TelegramUpdate {
  message: ProcessedMessage;
}


function parseUpdateData( data ){
  
}

export async function fetchChannelUpdate() {
  // ADD OFFSET
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset || 0}`
    );
    
    const data: TelegramResponse = await response.json();
    
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