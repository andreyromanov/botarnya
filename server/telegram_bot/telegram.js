require('dotenv').config({path:'.env'});

const express = require('express');
const router = express.Router();
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('Привет', (ctx) => ctx.reply('Welcome! We are Multipurpose E-shop!'))
bot.command('products', (ctx) => {
	ctx.reply('Наши товары:');
});

bot.launch()

module.exports = router;