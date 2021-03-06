import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { GlobalService } from '../global';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotoDbService } from './../database/foto-db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resizebase64 = require('resize-base64');  

  constructor(private global:GlobalService, private camera:Camera, private fotoDB: FotoDbService){
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
      //let img = this.resizebase64(base64Image, 250, 300); 

      this.fotoDB.trocaFoto(this.global.userid,this.global.user.login,base64Image);
    }, (err) => {
      alert("Erro ao abrir câmera");
    });
  }

  public logout(){
    localStorage.setItem("login", "");
    localStorage.setItem("senha", "");
    this.global.logado=false;
  }
}
