const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const chatSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  uid: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Chat', chatSchema);
