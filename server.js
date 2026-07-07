// ... üst kısımlar aynı ...
    } else {
        ctx.reply('Selam şef! Antrenman veya beslenme planı için bana "antrenor" yazman yeterli.');
    }
});

bot.launch();
app.get('/', (req, res) => res.send('Antrenor Bot aktif.'));
app.listen(process.env.PORT || 3000);
