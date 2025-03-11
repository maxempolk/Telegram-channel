// import TelegramBot, { Message } from "node-telegram-bot-api";

// const token = '6384113214:AAFxf5UQxYYN8hw_8mSB0KtUQQMt0fBk7GI';

async function getLatestChanges() {
  try {
    const response = await fetch('https://your-api.com/latest-changes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN' // если требуется аутентификация
      }
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Последние изменения:', data);
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

// Вызов функции
getLatestChanges();