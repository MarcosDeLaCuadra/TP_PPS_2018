import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChoferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chofer',
  templateUrl: 'chofer.html',
})
export class ChoferPage {

  precio:any = 0;
  origen: string;
  destino: string;
  title: string = 'My first AGM project';
  lat: Number = -34.7366571;
  lng: Number = -58.3887564;
  kms:string;
  metros:string;
  usuario:string;
  deshabilitado:boolean=true;
  estado:string="";
  fecha:Date;
  dir = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoferPage');
  }

  Precio(){
    console.log(this.kms)
    console.log(Number(this.kms))
    this.precio = parseFloat(this.kms);
    this.precio = this.precio * 100;
  }

  getDirection() {
    console.log(new Date(this.fecha).getTime())
    console.log(this.origen +" "+ this.destino)
    this.dir = {
      origin: this.origen,
      destination: this.destino,
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
    }    
 
  }

  dirChange(event:any){
    console.log(event.routes[0].legs[0].distance.text);
    console.log(event);
    this.kms= event.routes[0].legs[0].distance.text.split(" km", 1);
    this.kms = this.kms[0].replace(',','.');
    this.Precio();
    this.deshabilitado= false;
    
   // this.kms= this.kms.split("km", 1);
   // You can do anything.
  }

}
