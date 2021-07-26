const Chat = require('./model/chat');
const User = require('./model/user');

class FakeDb {
  constructor(){
    this.chats = [
      {
        message: 'bug発見しておきました。',
          uid: 2
      },
      {
        message: '詳細はチケットを確認してください',
        uid: 2
      },
      {
        message: '了解です！',
        uid: 1,
      },
      {
        message: 'bug修正して本番環境に上げておきました！',
        uid: 1,
      }
    ];

    this.users = [
      {
        uid: 1,
        name: '開発屋さん',
      },
      {
        uid: 2,
        name: 'テスト屋さん',
      }
    ];
  }

  async initDb() {
    await this.cleanDb();
    this.pushChatToDB();
    this.pushUserToDB();
  }

  async cleanDb() {
    await Chat.deleteMany();
    await User.deleteMany();
  }

  pushChatToDB(){
    this.chats.forEach(
      (chat) => {
        const newChat = new Chat(chat);
        newChat.save();
      }
    )
  }

  pushUserToDB(){
    this.users.forEach(
      (user) => {
        const newUser = new User(user);
        newUser.save();
      }
    )
  }

  seeDb() {
    this.pushChatToDB();
    this.pushUserToDB();
  }

}

module.exports = FakeDb;
