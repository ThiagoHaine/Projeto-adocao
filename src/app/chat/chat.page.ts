import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { GlobalService } from '../global';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(private global:GlobalService) {
  }

  ngOnInit() {
  }

}
