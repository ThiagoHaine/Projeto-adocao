import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule } from "@angular/forms";
import { ChatListComponent } from "./chat-list/chat-list.component";
import { ChatRoomComponent } from "./chat-room/chat-room.component";

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    ChatListComponent,
    ChatRoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent,
    ChatListComponent,
    ChatRoomComponent
  ],
  schemas:[
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule { }
