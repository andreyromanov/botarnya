require('dotenv').config({path:'.env'});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
const postRoute = require('./dialog.route');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/dialogs', postRoute)

app.listen(process.env.PORT, function(){
  console.log('Server is running on Port:', process.env.PORT);
});

//////////////////////////Tbot///////////////////
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('Привет', (ctx) => ctx.reply('Welcome! We are Multipurpose E-shop!'))

bot.command('products', (ctx) => {
	ctx.reply('Наши товары:');

});

bot.launch()

const routes = express.Router();

app.get('/', (req,res) => {
    res.send('Home Page');
});

module.exports = routes;