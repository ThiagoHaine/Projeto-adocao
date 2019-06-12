import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Animal } from '../models/animal';
import { GlobalService } from '../global';
import { AnimalDbService } from '../database/animal-db.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  foto:string="";
  resizebase64 = require('resize-base64');  
  nome:string="";
  especie:string="";
  raca:string="";
  genero:string="";
  idade:number=0;
  latitude:string;
  longitude:string;

  constructor(private camera:Camera, private geolocation:Geolocation, private global:GlobalService, private db:AnimalDbService) {

  }

  public tirarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.foto=base64Image;
      //let img = this.resizebase64(base64Image, 250, 300); 

      //this.foto = img;
    }, (err) => {
      alert("Erro ao abrir câmera");
    });
  }

  public doar(){
    let animal:Animal={
      adotado: false,
      especie: this.especie,
      foto: this.foto,
      latitude: this.latitude,
      longitude: this.longitude,
      nome: this.nome,
      raca: this.raca,
      usuario: this.global.user.login,
      idade: this.idade,
      genero: this.genero
    }

    this.db.doar(animal);
    alert("Animal colocado na lista de adoção com suceso!");
  }

  ngOnDestroy() {
  }

  ngOnInit() {
    console.log("oi");
    this.geolocation.getCurrentPosition().then(data=>{
      this.latitude=data.coords.latitude.toString();
      this.longitude=data.coords.longitude.toString();
      console.log(data);
    })
  }

}
