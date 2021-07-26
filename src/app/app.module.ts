import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatSpaseComponent } from './chat-space/chat-space.component';
import { CommentDatePipe } from './chat-space/pipes/comment-date.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './services/chat.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatSpaseComponent,
    CommentDatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
