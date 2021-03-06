const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  initial: {
    type: String,
    rquired: true
  }
});

module.exports = mongoose.model('User', userSchema);
