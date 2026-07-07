const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const app = express();

// Antrenman ve Beslenme Komutu
bot.command('antrenor', async (ctx) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Sen profesyonel bir fitness koçusun. Kullanıcıya motive edici bir dille, onun hedeflerine uygun antrenman ve beslenme tavsiyeleri ver.";
  
  try {
    const result = await model.generateContent(prompt);
    ctx.reply(result.response.text());
  } catch (error) {
    ctx.reply("Şu an antrenörüm biraz yorgun, lütfen tekrar dene.");
  }
});

bot.start((ctx) => ctx.reply('Selam şef! /antrenor yazarak benden program isteyebilirsin.'));
bot.launch();

app.get('/', (req, res) => res.send('Antrenör Bot çalışıyor.'));
app.listen(process.env.PORT || 3000);
