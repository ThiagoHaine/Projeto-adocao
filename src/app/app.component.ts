import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { GlobalService } from './global';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  private tabs:any[]=[
    {
      tab: "home",
      label: "Meu Perfil",
      icone: "person"
    },
    {
      tab: "chat",
      label: "Conversas",
      icone: "chatboxes"
    },
    {
      tab: "donate",
      label: "Doar",
      icone: "home"
    },
    {
      tab: "adopt",
      label: "Adotar",
      icone: "heart"
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private global: GlobalService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
