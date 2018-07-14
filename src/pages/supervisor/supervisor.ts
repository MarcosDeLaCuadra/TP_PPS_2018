import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController} from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { chat } from '../../clases/chat';
import { viajes } from '../../clases/viajes';
import { choferes} from '../../clases/choferes';
import { auto } from '../../clases/auto';
import { AlertController } from 'ionic-angular';
//import {SupervisorPage} from '../supervisor/supervisor'

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { EncuestaClientePage } from '../encuesta-cliente/encuesta-cliente';
import { EncuestaChoferPage } from '../encuesta-chofer/encuesta-chofer';

/**
 * Generated class for the SupervisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor',
  templateUrl: 'supervisor.html',
})
export class SupervisorPage {

  coleccionTipadaFirebase:AngularFirestoreCollection<viajes>;
    ListadoDeChatsObservable:Observable<viajes[]>;

    //para los choferes

    colecciondechoferes:AngularFirestoreCollection<choferes>;
    ListadodechoferesObservable:Observable<choferes[]>;
    asig:boolean
    ver:boolean
    chofer={nombre:''}
    rutausuario:string
    esperando:boolean
    estados:string="viajes";
    user= { email : '', password : '123456', nombre:'', apellido:'', direccion:'',
    telefono:'', tipo:'', foto:'', foto2:'', foto3:'', mensaje:'aca esta el menaje', 
    usuario:'yo', activo:true};
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public objFirebase:AngularFirestore) {
  this.ver=true
  this.user=this.navParams.data
  this.esperando=false
  console.info(this.navParams.data)
  console.info("los datos del usuario")
  console.info(this.user)
  

    }
  
  ViajesPendientes(){
    this.estados= "viajes";
   // this.ver=true;      
   // this.asig=false;
  }
  EncuestasChoferes(){
    this.navCtrl.push(EncuestaChoferPage); 
   // this.estados= "encuestaChoferes";
  }
  EcuestasClientes(){
    this.navCtrl.push(EncuestaClientePage); 
   // this.estados= "encuestaClientes";
  }


  ionViewDidEnter(){
    this.coleccionTipadaFirebase= this.objFirebase.collection('VIAJES');
     this.ListadoDeChatsObservable=this.coleccionTipadaFirebase.valueChanges();
   this.ListadoDeChatsObservable.subscribe(x => {
         console.info("conexión correcta con Firebase",x);
        x.forEach(usuario => {
          console.info("casrgsa el usuario")
          if(usuario.aceptado==true){
            this.esperando=false
          }
         
      //   this.ListaDeUsuarios.push(usuario);
      //   this.obtener()
        // this.cargar(this.email)
        // console.info(this.ListaDeUsuarios)
     
        
      // console.clear();
 //console.info(this.navParams.data)
       //  console.info(this.user)
        // console.info(usuario)
       });
 
       
 
      // this.mostrarSpinner=false;
       
     })
 
   }

   asignar(ruta){
     console.info('adentro de la fuinco')
      this.ver=false
      console.info(this.ver)
      this.asig=true
      this.rutausuario=ruta

      this.colecciondechoferes= this.objFirebase.collection('LISTADECHOFERES');
      this.ListadodechoferesObservable=this.colecciondechoferes.valueChanges();
      this.ListadodechoferesObservable.subscribe()

   }

   
   asignarchofer( choferes, auto ){
/*
    let chofer={

      id_chofer:choferes,
      id_auto:auto
    }*/

    console.info("adretro"+choferes+"auto:"+auto+ "USUARIO"+this.rutausuario)

    this.objFirebase.collection('VIAJES').doc(this.rutausuario).update({
      estado:"pendienteChofer",
      id_chofer:choferes,
      id_auto:auto
      
    });

    this.asig=false
    this.ver=true
   // this.esperar()
  }

  verdata(llave){

    console.info(llave)


  }

  esperar(){

    console.info('AFDENTRP DE ESPETRAR')
    this.esperando=true


  }


}
