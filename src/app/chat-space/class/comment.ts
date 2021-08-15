import { User } from './user';

//コメント追加クラス
export class Comment {

  date: number;
  user: User;

  constructor(public uid: number, public message: string){
    this.date = Date.now();
  }
}
