import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MessageDbService } from './../../database/message-db.service';
import { Message } from './../../models/message';
import { GlobalService } from '../../global';
import { Observable, Subscription, Subscriber } from 'rxjs';
import { DateTime } from '../../classes/datetime';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  private msgsFrom:Message[]=[];
  private msgsTo:Message[]=[];
  private msgs:Message[]=[];
  private subscribes:Subscription[]=[];
  private text:string="";

  constructor(private db:MessageDbService,private global:GlobalService) { }

  bubbleSort(arr:Message[]):Message[]{
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i+1]!=undefined){
          let d1:DateTime = new DateTime(arr[i].date);
          let d2:DateTime = new DateTime(arr[i+1].date);
          if (d1.compara(d2)==1) {
            let tmp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = tmp;
            swapped = true;
          }
        }
      }
    } while (swapped);
    return arr;
  };
  

  closeChat(){
    this.global.inchat="-1";
  }

  enviar(){
    let d:DateTime = new DateTime();
    if (this.text!=""){
      this.db.envia({
        msg: this.text,
        from: this.global.user.login,
        to: this.global.inchat,
        status: "unread",
        date: d.toText()
      });
      this.text="";
    }
  }

  concatMessages(){
    this.msgs = this.msgsFrom.concat(this.msgsTo);
    this.msgs.forEach(a=>{
      a.date=new DateTime(a.date).toText();
    });
    if (this.msgs.length>1){
      this.msgs=this.bubbleSort(this.msgs);
    }
  }

  ngOnInit() {
    this.subscribes[0]=this.db.escutaChat(this.global.user.login,this.global.inchat).subscribe(data=>{
      this.msgsFrom=data;
      this.concatMessages();
    }); 
    this.subscribes[1]=this.db.escutaChat(this.global.inchat,this.global.user.login).subscribe(data=>{
      this.msgsTo=data;
      this.concatMessages();
    }); 
  }

  ngOnDestroy(): void {
    this.subscribes.forEach(a=>{
      a.unsubscribe();
    });
  }

}
