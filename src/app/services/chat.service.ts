import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Chat } from '../chat-space/class/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: Socket;
  // chatId: number;
  chatId = 1;
  uid = 1;
  constructor(private http: HttpClient) { }

  //socketIoと接続するときの処理
  connect(chatId) {
    this.socket = io();
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('joinChatRoom' , { chatId: chatId});
    this.socket.emit('selectMessages', {chatId});
  }

  //addCommentやcommentを送信するために
  selectMessages(chatId) {
    this.socket.emit('selectMessages', {chatId});
  }

  reciveSelectMessages() {
    return new Observable((observer) => {
      this.socket.on("reciveSelectMessages", (messages) => {
        observer.next(messages);
      });
    })
  }

  sendMessage(chatId, chat ) {
    this.socket.emit('sendMessages', {chatId, chat:chat});
  }

  reciveSendMessages() {
    return new Observable((observer) => {
      this.socket.on("reciveSendMessages", (messages) =>{
        observer.next(messages);
      });
    });
  }

  editMessage(chatId, chat) {
    this.socket.emit('editMessage', {chatId, chat:chat});
  }

  reciveEditMessages() {
    return new Observable((observer) => {
      this.socket.on('reciveEditMessage', (messages) => {
        observer.next(messages);
      });
    });
  }

  deleteMessage(chatId, chat) {
    this.socket.emit('deleteMessage', {chatId, chat:chat});
  }

  reciveDeleteMessages() {
    return new Observable((observer) => {
      this.socket.on('reciveDeleteMessage', (messages) => {
        observer.next(messages);
      });
    });
  }

}
