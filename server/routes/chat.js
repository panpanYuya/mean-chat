const express = require('express');
const router = express.Router();
const Chat = require('../model/chat');
const User = require('../model/user');
const config = require('../config/dev');


let addComment = function(chatSchema) {
  // const {message, uid}= req.body
  const userId = parseInt(chatSchema.uid);
  var findResult = findUser(userId);
  if(findResult) {
    var saveResult = commentSave(chatSchema.message, userId, chatSchema.date);
    if(saveResult){
      return ({"added": true});
    }else {
      return ({errors: [{title: 'コメント登録エラー',detail: 'コメントを登録できませんでした。再度お試しください。'}]});
    }
  } else {
    return ({errors: [{title: 'ユーザエラー',detail: '対象のユーザーが存在しません。'}]});
  }

};

// let editComment = function(editSchema) {
//   let editResult = false;
//   // let objectId = mongoose.Types.ObjectId(editSchema.id);
//   const userId = parseInt(editSchema.uid)
//   let findResult = findUser(userId);
//   if(!findResult){
//     return editResult;
//   }
//   const chat = new Chat(editSchema.message, editSchema.userId , editSchema.date);
//   return new Promise(
//     () => {
//       chat.findOneAndUpdate(
//         {
//           _id: editSchema.id
//         },
//         {$set: {
//           message: edit.message,
//           uid: edit.uid,
//           date: edit.date
//         }}, function(err){
//           if(err){
//             return editResult;
//           }
//           editResult = true;
//           return editResult;
//         }
//       )
//     }
//   )
// };


function commentSave(message, uid, date) {
  let saveResult = false;
  const chat = new Chat({message, uid, date});
  return new Promise(
    () => {
      chat.save(function(err, foundChat) {
        if(err) {
          saveResult = false;
        }
        if(foundChat){
          saveResult = true;
        }
        return saveResult;
      })
    }
  )

}

function findUser(uid) {
  return new Promise(
    () => {
      var result = false;
      try{
         User.findOne({uid : uid}, function(err, foundUser) {
          if(err) {
            result = false;
          }
          if(foundUser) {
            result = true;
          }
        });
      }catch(err) {
        result = false;
      }
      return result;
    }
  );
};


module.exports = {
  router,
  addComment
}
