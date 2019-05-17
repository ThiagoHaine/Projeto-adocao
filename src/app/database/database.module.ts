import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDBService } from './login-db.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    LoginDBService
  ]
})
export class DatabaseModule { }
