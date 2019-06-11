import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { GlobalService } from '../global';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private global:GlobalService, private camera:Camera){
  }

  public tirarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      alert("Erro ao tirar foto");
    });
  }

  public logout(){
    localStorage.setItem("login", "");
    localStorage.setItem("senha", "");
    this.global.logado=false;
  }
}
