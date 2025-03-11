// import TelegramBot, { Message } from "node-telegram-bot-api";

export default async function handler(req, res) {
  const { offset } = req.query;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset || 0}`
    );
    
    const data = await response.json();
    
    if (data.ok) {
      const updates = data.result;
      const nextOffset = updates.length > 0 ? 
        updates[updates.length - 1].update_id + 1 : 
        offset || 0;
      
      res.status(200).json({ updates, nextOffset });
    } else {
      res.status(400).json({ error: 'Telegram API error' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch updates' });
  }
}

const token = '6384113214:AAFxf5UQxYYN8hw_8mSB0KtUQQMt0fBk7GI';
getLatestTelegramUpdates(token);