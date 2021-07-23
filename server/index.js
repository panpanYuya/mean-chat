const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(
  () => {
    const fakeDb = new FakeDb();
    fakeDb.initDb();
  }
)

const Schema = mongoose.Schema;



const app = express();

app.get('/chat',  function(req, res) {
  res.json({'success': true});
});

const PORT = process.env.PORT || '3001';

app.listen('3001', function() {
  console.log('I am running')
});




