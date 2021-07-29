const express = require('express');
const httpServer = require('http').createServer(express);
const io =require('socket.io')(httpServer, {
  cors: true,
  origins:["*"]
});
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const chatRoutes = require('./routes/chat');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient
const assert = require('assert');
const bodyParser = require('body-parser');

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(
  () => {
    const fakeDb = new FakeDb();
    // fakeDb.initDb();
  }
)

const Schema = mongoose.Schema;

io.on("connection", (socket) => {
  console.log("a user connected");
})


const app = express();
app.use(bodyParser.json())

app.use('/api/v1/chats', chatRoutes);

const PORT = process.env.PORT || '3001';


httpServer.listen('3001', function() {
  console.log('I am running')
});




