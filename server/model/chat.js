const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const ObjectId = Schema.ObjectId;

const chatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Chat', chatSchema);
