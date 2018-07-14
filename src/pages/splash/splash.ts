import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HomePage} from '../home/home'

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  audio = new Audio();

  

  progress:number;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public splashScreen: SplashScreen) {
    this.progress = 0;  
    let interval = window.setInterval(() => {
      this.progress = this.progress+1;
      if (this.progress >= 100) {
          window.clearInterval(interval);
      }
    }, 50);
  }
  ionViewDidEnter() {

    this.splashScreen.hide();
    this.sonido()
 
    setTimeout(() => {
      //this.viewCtrl.dismiss();
      this.navCtrl.setRoot(HomePage)
    }, 3500); // 6500
 
  }

  sonido(){

  
      this.audio.src = "assets/sonido/motor.mp3";
      this.audio.load();
      this.audio.play();
      //timer(3000);
      return
     
    
  }

}
