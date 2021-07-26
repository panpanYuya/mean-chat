const express = require('express');
const router = express.Router();
const Chat = require('../model/chat');
const MongoClient = require("mongodb").MongoClient;
const config = require('../config/dev');


router.get('', function(req, res){

  MongoClient.connect(config.DB_URI, (err, client) => {
    var db = client.db("myFirstDatabase");
    db.collection("chats").aggregate([
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "uid",
          as: "user"
        }
      }
    ]).toArray()
      .then((chat) => {
        console.log(chat);
        res.json(chat);
      })
      .catch((err) => {
        console.log(err);
        return res.status(422).send({errors: [{title: 'User error',detail: 'Something went wrong!'}]})
      })
      .then(() => {
        client.close();
      });
  });
});

router.post('/add', function(req, res) {
  const {message, uid}= req.body
  var findResult = this.findUser(uid);
  if(findResult) {
    var saveResult = this.commentSave(message, uid);
    if(saveResult){
      return res.json({"added": true});
    }else {
      res.status(422).send({errors: [{title: 'コメント登録エラー',detail: 'コメントを登録できませんでした。再度お試しください。'}]})
    }
  } else {
    res.status(422).send({errors: [{title: 'ユーザエラー',detail: '対象のユーザーが存在しません。'}]})
  }

});

function commentSave(message, uid) {
  const chat = new Chat({message, uid})
  chat.save(function(err) {
    if(err) {
      return false;
    }
    return true;
  })
}

function findUser(uid) {
  User.findOne({uid : uid}, function(err, User) {
    if(err) {
      return false;
    }
    return true;
  });
};


module.exports = router
