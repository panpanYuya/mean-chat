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
// const chat = require('./model/chat');
const Chat = require('./model/chat');
const mongodb = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const chat = require('./model/chat');



const Schema = mongoose.Schema;

//socketフロントでソケット
//joinの時はsocket

io.on("connection", (socket) => {
  console.log("a user connected");

  mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(
    () => {
      if(process.env.NODE_ENV !== 'production'){
        const fakeDb = new FakeDb();
        // fakeDb.initDb();
      }
    }
  )
  //messageはJSONのキー名
  // socket.emit('message', ' Just conneted');
  // io.emit("connet everyone");
  // socket.join("");
  // socket.to("UNIQUE").emit("message", "this is a pen");
  // io.to("UNIQUE").emit("message", "this is a pen");
  //emit 送信者を除く人 送信
  //to('A')Aさんに向けて送信
  //braoadcast 同じ名前空間の人へ向けて送信
  //onは受け取る
  //joinChatのチャンネルを作成する。

  socket.on("joinChatRoom", (chatId) => {
    socket.join(chatId);
    socket.to(chatId).emit("message", "誰かがきましたよ")
  });

  socket.on("selectMessages", (chatId) => {
    // let selectMessages = chatRoutes.getChat();
    // chatRoutes.getChat().then((selectMessages) => {
    //   io.to(chatId.chatId).emit("reciveSelectMessages", selectMessages);
    // }).catch(err => {
    //   console.log(err);
    // });

    Chat.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "uid",
          as: "user"
        }
      }
    ]).then((chats) => {
        console.log(chats);
        io.emit("reciveSelectMessages", chats);
      })
      .catch((err) => {
        console.log(err);
        //errorが発生した場合はtypescriptでエラーを受け取れる環境を作ってあげればOK
        //io.to(chatId.chatId).emit("reciveSelectMessages", chat);
        // return status(422).send({errors: [{title: 'User error',detail: 'Something went wrong!'}]})
      });

  });

  socket.on("sendMessages", (chat) => {
    const chatSchema = new Chat(chat.chat);
    let saveChats = chatRoutes.addComment(chatSchema);
    io.emit("reciveSendMessages", saveChats);
    // let selectMessages = chatRoutes.getChat()
    // chatRoutes.getChat().then(selectMessages => {
    //   io.to(chatId).emit("receiveSendMessage", selectMessages);
    // })
  });

  // socket.on("addComment", (chatId, chat) => {
  //   chatRoutes.addComment(chatId, chat).then((chat, err) => {
  //     io.to(chatId).emit("")
  //   })
  // })

  socket.on("editMessage", (editMessage) => {
    // const id = new mongodb.ObjectID( editMessage.chat._id );
    const id = new mongodb.ObjectId( editMessage.chat.chat._id );
    // const chatSchema = new Chat(editMessage.chat.chat);
    Chat.updateOne(
      {
        _id : id
      },
      {
        message: editMessage.chat.chat.message
      }
    ).then((editComment) => {
        console.log(editComment);
        // io.emit("reciveSelectMessages", chats);
        io.emit("reciveEditMessage", editComment);
    })
    .catch((err) => {
        console.log(err);
        //errorが発生した場合はtypescriptでエラーを受け取れる環境を作ってあげればOK
        //io.to(chatId.chatId).emit("reciveSelectMessages", chat);
        //
    });
  });

  socket.on("deleteMessage", (editMessage) => {
    // const id = new mongodb.ObjectID( editMessage.chat._id );
    const id = new mongodb.ObjectId( editMessage.chat.chat._id );
    // const chatSchema = new Chat(editMessage.chat.chat);
    Chat.deleteOne(
      {
        _id : id
      },
      {
        message: editMessage.chat.chat.message
      }
    ).then((deleteComment) => {
        console.log(deleteComment);
        // io.emit("reciveSelectMessages", chats);
        io.emit("reciveDeleteMessage", deleteComment);
    })
    .catch((err) => {
        console.log(err);
        //errorが発生した場合はtypescriptでエラーを受け取れる環境を作ってあげればOK
        //io.to(chatId.chatId).emit("reciveSelectMessages", chat);
        //
    });
  });


});



const app = express();
app.use(bodyParser.json())

const PORT = process.env.PORT || '3001';

//serverを一つにする関係で、d28行目、29行目のurl以外が飛んできたらreq,resをindex.htmlに返す。
//mean環境の動画1の113番で解説してる
if(process.env.NODE_ENV === 'production') {
  const appPath = path.join( __dirname, '..', 'dist', 'mean-chat')
  app.use(express.static(appPath))
  app.get('*', function(req, res){
    res.sendFile(path.resolve(appPath, 'index.html'))
  })
}


httpServer.listen('3001', function() {
  console.log('I am running')
});




