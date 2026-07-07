const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const app = express();

bot.on('message', async (ctx) => {
    const text = ctx.message.text ? ctx.message.text.toLowerCase() : '';

    if (text.includes('antrenor')) {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = "Sen profesyonel bir fitness koçusun. Kullanıcıya motive edici bir dille antrenman veya beslenme tavsiyesi ver.";
            const result = await model.generateContent(prompt);
            ctx.reply(result.response.text());
        } catch (error) {
            console.error(error);
            ctx.reply("Şu an biraz yorgunum, lütfen tekrar dene.");
        }
    } else {
        ctx.reply('Selam şef! Antrenman veya beslenme planı için bana "antrenor" yazman yeterli.');
    }
});

bot.launch();
app.get('/', (req, res) => res.send('Antrenor Bot aktif.'));
app.listen(process.env.PORT || 3000);
