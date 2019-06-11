import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MessageDbService } from './../../database/message-db.service';
import { Message } from './../../models/message';
import { GlobalService } from '../../global';
import { Observable, Subscription, Subscriber } from 'rxjs';
import { DateTime } from '../../classes/datetime';
import { FotoDbService } from './../../database/foto-db.service';
import { Foto } from '../../models/foto';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  private msgsFrom:Message[]=[];
  private msgsTo:Message[]=[];
  private msgs:Message[]=[];
  private pool:Message[]=[];
  private subscribes:Subscription[]=[];
  private text:string="";
  private new:number=0;
  private scroll=false;
  private foto:Foto;
  private interval;

  constructor(private db:MessageDbService,private global:GlobalService, private fotoDB: FotoDbService) {
    this.foto={
      login: this.global.inchat,
      foto: ""
    };
   }

  bubbleSort(arr:Message[]):Message[]{
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i+1]!=undefined){
          if (arr[i].ordem>arr[i+1].ordem) {
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

  scrooldown(){
    this.scroll=true;
  }

  enviar(){
    let d:DateTime = new DateTime();
    if (this.text!=""){
      this.db.envia({
        msg: this.text,
        from: this.global.user.login,
        to: this.global.inchat,
        status: "unread",
        date: d.toText(),
        ordem: this.new
      });
      this.text="";
    }
  }

  concatMessages(){
    this.pool = this.msgsFrom.concat(this.msgsTo);
    this.pool.forEach(a=>{
      a.date=new DateTime(a.date).toText();
    });
    this.pool.forEach(a => {
      this.msgs.push(a);
    });
    this.msgs=this.bubbleSort(this.msgs);
    this.pool=[];
    this.msgsFrom=[];
    this.msgsTo=[];
    this.new = this.msgs.length+1;
    this.scrooldown();
  }

  ngOnInit() {
    let subs:Subscription=this.fotoDB.getFoto(this.global.inchat).subscribe(data=>{
      if (data.length>0){
        this.foto=data[0];
      }
      subs.unsubscribe();
    });
    this.interval=setInterval(()=>{
      if (this.scroll){
        let chat = document.getElementById("msgSpace");
        let to = chat.scrollHeight - chat.offsetHeight;
        if (chat.scrollTop<to){
          chat.scrollTop+=150;
        }else{
          this.scroll=false;
        }
      }
    },10);
    this.subscribes[0]=this.db.escutaChat(this.global.user.login,this.global.inchat).subscribe(data=>{
      if (this.msgs==[]){
        this.msgsFrom=data;
      }else{
        data.forEach(a=>{
          if (this.msgs.find(b=>a.msg==b.msg && a.ordem==b.ordem && a.date==b.date)==undefined){
            this.msgsFrom.push(a);
          }
        });
      }
      this.concatMessages();
    }); 
    this.subscribes[1]=this.db.escutaChat(this.global.inchat,this.global.user.login).subscribe(data=>{
      if (this.msgs==[]){
        this.msgsTo=data;
      }else{
        data.forEach(a=>{
          if (this.msgs.find(b=>a.msg==b.msg && a.ordem==b.ordem && a.date==b.date)==undefined){
            this.msgsTo.push(a);
          }
        });
      }
      this.concatMessages();
    }); 
    this.subscribes[2]=this.db.leituraIds(this.global.inchat,this.global.user.login).subscribe(data=>{
      data.forEach(a=>{
        let currId=this.db.getId(a);
        this.db.leMensagem(currId);
      })
    })
  }

  ngOnDestroy(): void {
    this.subscribes.forEach(a=>{
      a.unsubscribe();
    });
    clearInterval(this.interval);
  }

}
