const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')
const token = '6269115208:AAF0oiFtFHv_1hKhgGqP4kdNZFiNq9ozuVs';
const bot = new TelegramBot(token, {polling: true});
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  bot.sendMessage(chatId, resp);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
    if(msg.text.startsWith('# ')){
        const p = msg.text.split(' ')[1]
        bot.sendMessage(chatId, 'Downloading videos ...')
        const d = await axios.post('https://ssyoutube.com/api/convert', {url: p})
        const r = d.data;
        const w = r.url[0].url;
        const title = r.meta.title;
        bot.sendVideo(msg.chat.id, w);
    }
});

