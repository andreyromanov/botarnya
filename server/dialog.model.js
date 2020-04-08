const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Dialog
let Dialog = new Schema({
  req: {
    type: String
  },
  res: {
    type: String
  }
},{
    collection: 'dialogs'
});

module.exports = mongoose.model('Dialog', Dialog);