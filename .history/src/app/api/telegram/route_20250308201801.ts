// import TelegramBot, { Message } from "node-telegram-bot-api";

import { NextApiRequest, NextApiResponse } from 'next';

const botToken = ""

export async function GET(offset = 0) {
  // try {
  //   const response = await fetch(
  //     `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset || 0}`
  //   );
    
  //   const data = await response.json();
    
  //   if (data.ok) {
  //     const updates = data.result;
  //     const nextOffset = updates.length > 0 ? 
  //       updates[updates.length - 1].update_id + 1 : 
  //       typeof offset === 'string' ? parseInt(offset) || 0 : 0;
      
  //     Response.status(200).json({ updates, nextOffset });
  //   } else {
  //     res.status(400).json({ error: `Telegram API error: ${data.description || 'Unknown error'}` });
  //   }
  // } catch (error) {
  //   const errorMessage = error instanceof Error ? error.message : 'Failed to fetch updates';
  //   res.status(500).json({ error: errorMessage });
  // }

  // const posts = await data.json()

  return new Response("aboba", {status:500})
}


// // Типы для ответа Telegram API
// interface TelegramUser {
//   id: number;
//   is_bot: boolean;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   language_code?: string;
// }

// interface TelegramChat {
//   id: number;
//   type: 'private' | 'group' | 'supergroup' | 'channel';
//   title?: string;
//   username?: string;
//   first_name?: string;
//   last_name?: string;
// }

// interface TelegramMessage {
//   message_id: number;
//   from: TelegramUser;
//   chat: TelegramChat;
//   date: number;
//   text?: string;
//   photo?: Array<any>;
//   document?: any;
//   // Можно добавить другие поля сообщения при необходимости
// }

// interface TelegramUpdate {
//   update_id: number;
//   message?: TelegramMessage;
//   edited_message?: TelegramMessage;
//   channel_post?: TelegramMessage;
//   edited_channel_post?: TelegramMessage;
//   // Можно добавить другие типы обновлений при необходимости
// }

// interface TelegramResponse {
//   ok: boolean;
//   result: TelegramUpdate[];
//   description?: string;
//   error_code?: number;
// }

// interface UpdatesResponseData {
//   updates: TelegramUpdate[];
//   nextOffset: number;
// }

// interface ErrorResponseData {
//   error: string;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<UpdatesResponseData | ErrorResponseData>
// ): Promise<void> {
//   const { offset } = req.query;
//   // const botToken = process.env.TELEGRAM_BOT_TOKEN;
//   const botToken = '6384113214:AAFxf5UQxYYN8hw_8mSB0KtUQQMt0fBk7GI';
  
//   if (!botToken) {
//     res.status(500).json({ error: 'Telegram bot token is not configured' });
//     return;
//   }
  


