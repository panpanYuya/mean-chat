import { Component, OnInit } from '@angular/core';

import { Comment }  from './class/comment';
import { User } from './class/user';

const ANOTHER_USER: User = new User(1, 'テスト屋さん');
const CURRENT_USER: User = new User(2, '開発屋さん');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER,'bug発見しておきました。'),
  new Comment(ANOTHER_USER,'詳細はチケットを確認してください'),
  new Comment(CURRENT_USER,'了解です！'),
  new Comment(CURRENT_USER,'bug修正して本番環境に上げておきました！'),
];



@Component({
  selector: 'app-chat-spase',
  templateUrl: './chat-spase.component.html',
  styleUrls: ['./chat-spase.component.css']
})
export class ChatSpaseComponent implements OnInit {

  comments = COMMENTS;
  currentUser = CURRENT_USER;
  comment = '';
  // commentDateFormat = 'yyyy年MM月dd日 HH:mm';

  constructor() {}

  ngOnInit(): void {
  }

  addComment(comment: string): void {
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
    }
  }

}
