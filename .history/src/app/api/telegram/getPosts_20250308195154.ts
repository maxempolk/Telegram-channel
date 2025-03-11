import TelegramBot, { Message } from "node-telegram-bot-api";

const token = '6384113214:AAFxf5UQxYYN8hw_8mSB0KtUQQMt0fBk7GI';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg: Message, match: RegExpExecArray | null) => {

  const chatId = msg.chat.id;
  const resp = match[1]; 

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
});