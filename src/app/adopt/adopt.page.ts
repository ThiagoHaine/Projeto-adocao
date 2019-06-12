import { Component, OnInit } from '@angular/core';
import { Dijkstra } from '../classes/dijkstra';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Animal } from '../models/animal';
import { GlobalService } from '../global';
import { AnimalDbService } from '../database/animal-db.service';
import { Digraph } from '../classes/digraph';
import { Vertex } from '../classes/vertex';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.page.html',
  styleUrls: ['./adopt.page.scss'],
})
export class AdoptPage implements OnInit {
  d:Digraph=new Digraph();
  lista:Animal[];
  latitude:string="";
  longitude:string="";
  constructor(private geolocation:Geolocation, private global:GlobalService, private db:AnimalDbService) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then(a=>{
      this.latitude=a.coords.latitude.toString();
      this.longitude=a.coords.longitude.toString();
    });
    this.db.listar().subscribe(pets=>{
      this.d.VertexList=[]
      let eu:Vertex = new Vertex({adotado: false,especie:"Humano",foto:"",nome:"Eu",raca:"",usuario:"",idade:0,genero:"",latitude:this.latitude,longitude:this.longitude});
      this.d.VertexList.push(eu);
      pets.forEach(a=>{
        this.d.VertexList.push(a);
      });

      this.lista=pets;
    });
  }

}
