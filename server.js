const { Telegraf } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const app = express();

bot.start((ctx) => ctx.reply('Bot aktif! Selam şef.'));
bot.on('text', (ctx) => ctx.reply('Mesajını aldım: ' + ctx.message.text));

bot.launch();

app.get('/', (req, res) => res.send('Bot çalışıyor.'));
app.listen(process.env.PORT || 3000);
