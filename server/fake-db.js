const Chat = require('./model/chat');

class FakeDb {
  constructor(){
    this.chats = [
      {
        name: 'テスト屋さん',
        message: 'bug発見しておきました。'
      },
      {
        name: 'テスト屋さん',
        message: '詳細はチケットを確認してください'
      },
      {
        name: '開発屋さん',
        message: '了解です！'
      },
      {
        name: '開発屋さん',
        message: 'bug修正して本番環境に上げておきました！'
      }
    ]
  }

  async initDb() {
    await this.cleanDb()
    this.pushChatToDB()
  }

  async cleanDb() {
    await Chat.deleteMany()
  }

  pushChatToDB(){
    this.chats.forEach(
      (chat) => {
        const newChat = new Chat(chat);
        newChat.save();
      }
    )
  }

  seeDb() {
    this.pushChatToDB();
  }

}

module.exports = FakeDb;
