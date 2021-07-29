import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatSpaceModule } from './chat-space/chat-space.module';

const routes: Routes = [
  {path: '', redirectTo: 'chat', pathMatch: 'full'},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    ChatSpaceModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
