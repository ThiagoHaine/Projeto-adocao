import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDBService } from './login-db.service';
import { MessageDbService } from './message-db.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    LoginDBService,
    MessageDbService
  ]
})
export class DatabaseModule { }
