import { Component, OnInit } from '@angular/core';

import { Comment }  from '../chat-space/class/comment';
import { User } from '../chat-space/class/user';
import { Chat } from '../chat-space/class/chat'
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


const ANOTHER_USER: User = new User(1, 'テスト屋さん');
const CURRENT_USER: User = new User(2, '開発屋さん');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER,'bug発見しておきました。'),
  new Comment(ANOTHER_USER,'詳細はチケットを確認してください'),
  new Comment(CURRENT_USER,'了解です！'),
  new Comment(CURRENT_USER,'bug修正して本番環境に上げておきました！'),
];



@Component({
  selector: 'app-chat-space',
  templateUrl: './chat-space.component.html',
  styleUrls: ['./chat-space.component.css']
})
export class ChatSpaseComponent implements OnInit {

  comments = COMMENTS;
  currentUser = CURRENT_USER;
  currentUserIntial = '';
  otherUserIntial = '';
  comment = '';
  chats: any;

  constructor(
    private chatService: ChatService,
    private router: Router
  ) {
    this.getChat(chatService);
  }

  ngOnInit(): void {}

  addComment(comment: string): void {
    const chat =new Chat(this.currentUser.uid, comment);
    this.chatService.addComment(chat).subscribe(
      (data) => {
        console.log("Success")
        this.router.navigate(['/'])
      },
      (err) => {
        console.log('次のエラーが発生しました。' + err)
      }
    )
  }

  getChat(chatService: ChatService){
    const chatsObservable = this.chatService.getChats()
    chatsObservable.subscribe(
      (data) => {
        this.chats = data;
        for (let i = 0; i < this.chats.length; i++){
          if(this.chats[i].uid === CURRENT_USER.uid){
              this.currentUserIntial = this.chats[i].user[0].name.slice(0, 1);
          }else {
            this.otherUserIntial = this.chats[i].user[0].name.slice(0, 1);
          }
        }
        console.log('次のデータが出力されました。' + data);
      },
      (err) => {
        console.log('次のエラーが発生しました。' + err);
      }
    )
  }

}
