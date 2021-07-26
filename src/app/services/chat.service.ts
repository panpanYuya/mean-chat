import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../chat-space/class/chat';
import { Comment } from '../chat-space/class/comment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChats() : Observable<any> {
    return this.http.get('/api/v1/chats');
  }

  addComment(chat : Chat): Observable<any>{
    return this.http.post('/api/v1/chats/add', chat);
  }
}
