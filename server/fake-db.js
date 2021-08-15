const Chat = require('./model/chat');
const User = require('./model/user');

class FakeDb {
  constructor(){
    this.chats = [
      {
        message: 'bug発見しておきました。',
          uid: 2,
          date: '1628513313786'
        },
        {
          message: '詳細はチケットを確認してください',
          uid: 2,
          date: '1628513313786'
        },
        {
          message: '了解です！',
          uid: 1,
          date: '1628513313786'
        },
        {
          message: 'bug修正して本番環境に上げておきました！',
          uid: 1,
          date: '1628513313786'
      }
    ];

    this.users = [
      {
        uid: 1,
        name: '開発屋さん',
        initial: '開'
      },
      {
        uid: 2,
        name: 'テスト屋さん',
        initial: 'テ'
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
