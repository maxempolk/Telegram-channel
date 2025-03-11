// import TelegramBot, { Message } from "node-telegram-bot-api";

import { NextApiRequest, NextApiResponse } from 'next';


type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}

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
  
//   try {
//     const response = await fetch(
//       `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset || 0}`
//     );
    
//     const data: TelegramResponse = await response.json();
    
//     if (data.ok) {
//       const updates = data.result;
//       const nextOffset = updates.length > 0 ? 
//         updates[updates.length - 1].update_id + 1 : 
//         typeof offset === 'string' ? parseInt(offset) || 0 : 0;
      
//       res.status(200).json({ updates, nextOffset });
//     } else {
//       res.status(400).json({ error: `Telegram API error: ${data.description || 'Unknown error'}` });
//     }
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Failed to fetch updates';
//     res.status(500).json({ error: errorMessage });
//   }
// }


