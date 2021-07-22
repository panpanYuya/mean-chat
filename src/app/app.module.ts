import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatSpaseComponent } from './chat-spase/chat-spase.component';
import { CommentDatePipe } from './chat-spase/pipes/comment-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatSpaseComponent,
    CommentDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
