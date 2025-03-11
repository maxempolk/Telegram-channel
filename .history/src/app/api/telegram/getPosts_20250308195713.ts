// import TelegramBot, { Message } from "node-telegram-bot-api";

async function getLatestTelegramUpdates(botToken, offset = 0) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset}&timeout=30`);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.ok) {
      const updates = data.result;
      
      // Если есть обновления, установите новый offset для следующего запроса
      // (чтобы не получать одни и те же сообщения повторно)
      const newOffset = updates.length > 0 ? updates[updates.length - 1].update_id + 1 : offset;
      
      console.log('Последние обновления:', updates);
      
      // Обработка полученных обновлений
      updates.forEach(update => {
        if (update.message) {
          console.log(`Новое сообщение от ${update.message.from.username || update.message.from.first_name}: ${update.message.text}`);
        }
      });
      
      // Для непрерывного получения обновлений можно использовать рекурсивный вызов
      // setTimeout(() => getLatestTelegramUpdates(botToken, newOffset), 1000);
      
      return { updates, nextOffset: newOffset };
    } else {
      throw new Error('Telegram API returned false');
    }
  } catch (error) {
    console.error('Ошибка при получении обновлений:', error);
    return { updates: [], nextOffset: offset };
  }
}

const token = '6384113214:AAFxf5UQxYYN8hw_8mSB0KtUQQMt0fBk7GI';
getLatestTelegramUpdates(token);