require('dotenv').config({path:'.env'});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql2");
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(process.env.PORT, function(){
  console.log('Server is running on Port:', process.env.PORT);
});

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('Привет', (ctx) => ctx.reply('Welcome! We are Multipurpose E-shop!'))

console.log(process.env.HOST, process.env.LOGIN, process.env.DB, process.env.PASSWORD)

bot.command('products', (ctx) => {
	ctx.reply('Наши товары:');

	    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.LOGIN,
        database: process.env.DB,
        password: process.env.PASSWORD
    });

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(`SELECT * FROM products`, function (err, result, fields) {
            if (err) throw err;

            result.forEach(function (arrayItem) {
                ctx.reply(arrayItem.name)
            });
            console.log('products command')
        });
    });
});

bot.on('text', (ctx) => {
        const connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.LOGIN,
            database: process.env.DB,
            password: process.env.PASSWORD
        });

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(`SELECT * FROM bot_dialogs`, function (err, result, fields) {
            if (err) throw err;
            result.forEach(function (arrayItem) {
                if(ctx.message.text.toLowerCase().includes(arrayItem.req)) {
                    ctx.reply(arrayItem.res)
                }
            });
        
        });
    });
});

bot.launch()


const routes = express.Router();

app.get('/', (req,res) => {
    res.send('Home Page');
});

app.get('/dialogs', (req,res) => {
            const connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.LOGIN,
            database: process.env.DB,
            password: process.env.PASSWORD
        });

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(`SELECT * FROM bot_dialogs`, function (err, result, fields) {
            if (err) throw err;
            res.send(result)        
        });
    });
});

module.exports = routes;