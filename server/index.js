require('dotenv').config({path:'.env'});

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//Import routes
const postRoute = require('./dialog.route');
app.use('/dialogs', postRoute);
const TelegramRoute = require('./telegram_bot/telegram');
app.use('/telegram', TelegramRoute);

//Connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

//Set and run server
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(process.env.PORT, function(){
  console.log('Server is running on Port:', process.env.PORT);
});

module.exports = router;