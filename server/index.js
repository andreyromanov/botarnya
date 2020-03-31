const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mysql = require("mysql2");
const Telegraf = require('telegraf')
const bot = new Telegraf('1019430733:AAFOUpViOsa25fU2o59_PfROusJz0iMZOlI')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('Привет', (ctx) => ctx.reply('Welcome! We are Multipurpose E-shop!'))

bot.command('products', (ctx) => {
	ctx.reply('Наши товары:');

	    const connection = mysql.createConnection({
        host: "localhost",
        user: "admin",
        database: "adminka",
        password: "password"
    });

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(`SELECT * FROM products`, function (err, result, fields) {
            if (err) throw err;

            result.forEach(function (arrayItem) {
                /*if(message.text.toLowerCase().includes(arrayItem.key)) {
                    bot.sendMessage(message.chat.id, arrayItem.answer);
                }*/
                ctx.reply(arrayItem.name)
            });
            console.log('products command')
        });
    });
});

bot.launch()