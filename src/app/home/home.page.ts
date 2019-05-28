import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { GlobalService } from '../global';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private global:GlobalService){
  }
}
