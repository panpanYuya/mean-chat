import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChats() : Observable<any> {
    return this.http.get('/api/v1/chats');
  }
}
