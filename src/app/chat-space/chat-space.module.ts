import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { ChatSpaseComponent } from './chat-space.component';


const routes: Routes = [
  {
    path: 'chat',
    component: ChatSpaseComponent
  },
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ChatSpaceModule { }
