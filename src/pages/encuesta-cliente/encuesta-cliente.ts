import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { chat } from '../../clases/chat';
import { viajes } from '../../clases/viajes';
import { choferes} from '../../clases/choferes';
import { encuestacliente} from '../../clases/encuestacliente';
import { auto } from '../../clases/auto';
import { AlertController } from 'ionic-angular';
//import {SupervisorPage} from '../supervisor/supervisor'

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseFirestore } from '@firebase/firestore-types';

/**
 * Generated class for the EncuestaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta-cliente',
  templateUrl: 'encuesta-cliente.html',
})
export class EncuestaClientePage {
  coleccionTipadaFirebase:AngularFirestoreCollection<encuestacliente>;
  ListadoEncuestaObservable:Observable<encuestacliente[]>;
  Listadoenc:Array<encuestacliente>;

    //para los choferes

    colecciondechoferes:AngularFirestoreCollection<choferes>;
    ListadodechoferesObservable:Observable<choferes[]>;
    asig:boolean
    ver:boolean

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public objFirebase:AngularFirestore) {

        this.Listadoenc=new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestachoferPage');

   this.coleccionTipadaFirebase=this.objFirebase.collection('EncuestaClientes')
 this.ListadoEncuestaObservable=this.coleccionTipadaFirebase.valueChanges() 
    this.ListadoEncuestaObservable.subscribe(x=>{  
      console.info(x)
      x.forEach(item=> {
      if(item){

        this.Listadoenc.push(item)     
       }
    });
          
    });

    console.log('fiun ')
  }

}
