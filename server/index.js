const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const chatRoutes = require('./routes/chat');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient
const assert = require('assert');

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

app.use('/api/v1/chats', chatRoutes);

const PORT = process.env.PORT || '3001';

app.listen('3001', function() {
  console.log('I am running')
});




