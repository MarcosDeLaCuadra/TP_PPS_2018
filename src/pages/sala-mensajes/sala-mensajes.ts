import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController} from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { chat } from '../../clases/chat';
import { auto } from '../../clases/auto';
import { AlertController } from 'ionic-angular';
import {SupervisorPage} from '../supervisor/supervisor'

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ListPage } from '../list/list';
import { PasajeroPage } from '../pasajero/pasajero';

/**
 * Generated class for the SalaMensajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sala-mensajes',
  templateUrl: 'sala-mensajes.html',
})
export class SalaMensajesPage {
coleccionTipadaFirebase:AngularFirestoreCollection<chat>;
    ListadoDeChatsObservable:Observable<chat[]>;
    usuario:string
  mostrarSpinner:any;
  user= { email : '', password : '123456', nombre:'', apellido:'', direccion:'',
  telefono:'', tipo:'', foto:'', foto2:'', foto3:'', mensaje:'aca esta el menaje', 
  usuario:'yo', activo:true};

  //para cargar los usuarios:
  ListaDeUsuarios:Array<chat>;
  cliente:boolean
  solicitar:boolean
  chofer:boolean
  auto:auto
  viaje= { desde : '', hasta : '', hora_salida:'', c_personas:'', usuario:'', activo:true};

  constructor(public VentanaAlert:AlertController, private objFirebase: AngularFirestore,
  private navParams:NavParams, public camera:Camera, public navCtrl:NavController) {
    //this.user.email=this.navParams.data
    this.mostrarSpinner=true;
    this.ListaDeUsuarios=new Array();
    this.cargarUsuario();

  }
  ionViewDidEnter(){
    this.coleccionTipadaFirebase= this.objFirebase.collection<chat>('USUARIOS', ref=> ref.orderBy('tiempo','desc'));
    this.ListadoDeChatsObservable=this.coleccionTipadaFirebase.valueChanges();
  this.ListadoDeChatsObservable.subscribe(x => {
        //console.info("conexión correcta con Firebase",x);
        x.forEach(usuario => {
          this.ListaDeUsuarios.push(usuario);
        });
      this.mostrarSpinner=false;
    })
     //console.log("fin de ionViewDidEnter");
   
  
  }

  nuevoMensaje()
  {
    let prompt= this.VentanaAlert.create({
        title: "INGRESO SIN FOTO",
        message:"DEBE TOMARSE UNA FOTO",
        buttons:[{
          text:'Cancelar'
          },{
          text:'SACAR FOTO',
          handler:data=>{
            this.sacarFoto();
          }
        }]
    });
    prompt.present();
  }

  agregarMensaje(mensaje:string)
  {
     let nuevoMensaje:chat;
     nuevoMensaje= new chat(mensaje);     
     let objetoJsonGenerico= nuevoMensaje.dameJSON();
     //console.log (objetoJsonGenerico );
      //this.objFirebase.collection<chat>('chatTest').add({mensaje:nuevoMensaje.mensaje,usuario:nuevoMensaje.usuario,tiempo:Date()}).then(
      this.objFirebase.collection<chat>('USUARIOS').add(objetoJsonGenerico).then(
      Retorno=>
      {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        //console.log(`id= ${Retorno.id} ,  mensaje= ${mensaje}`);
      }
      ).catch( error=>{
        console.error(error);
      });
  }

  public cargarUsuario(){
    this.user.email=this.navParams.data;
    this.coleccionTipadaFirebase= this.objFirebase.collection<chat>('USUARIOS');
    this.ListadoDeChatsObservable=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeChatsObservable.subscribe(x => {
          //console.info("conexión correcta con Firebase",x);
          x.forEach(usuario => {
            console.log(usuario.email)
            if(usuario.email == this.user.email){
              this.user.tipo= usuario.tipo;
              
                  
            }
            //console.log(usuario)
            //this.ListaDeUsuarios.push(usuario);
          });
        this.mostrarSpinner=false;
      });

      this.ver();
     //console.log("fin de ionViewDidEnter");


    
   //anda de aca para abajo
    //console.info('revisocredrio')
  /*  this.ListaDeUsuarios.forEach(usu => {
      if (usu.email == this.navParams.data) {
        this.usuario=usu.nombre
        //console.info('aca esata:', usu);
        this.mostrarSpinner=false
        this.user.nombre=usu.nombre
        this.user.apellido=usu.apellido
        this.user.direccion=usu.direccion
        this.user.telefono=usu.tel
        this.user.activo=usu.activo
        this.user.tipo=usu.tipo
        this.user.email=usu.email
        this.user.foto=usu.foto
        //console.info('usuario cargado:'+this.user)
        //console.info('funcion ver')
        this.ver()
    

      }

     // else this.nuevoMensaje();

    });*/

  }

  ver(){

    //console.info('usuario cargado corectamente')
    //console.info(this.user)
    if(this.user.foto==""){
     // this.nuevoMensaje()
    }

    if(this.user.tipo=="cliente"){
      this.cliente=true
    }

    if(this.user.tipo=="chofer"){
      this.navCtrl.setRoot(ListPage, this.user.email) 
    }

    if(this.user.tipo=="supervisor"){
      this.navCtrl.setRoot(SupervisorPage,this.user)
    }

    if(this.user.tipo=="cliente"){
      this.navCtrl.setRoot(PasajeroPage,this.user)
    }
  }

  solicitarauto(){
this.solicitar=true
this.cliente=false

  }

  solicitarauto2(){
    this.viaje.usuario=this.user.email

    this.objFirebase.collection('VIAJES').add(this.viaje)
    
      }
  
  sacarFoto(){
    let cod=Date.now();

    let cameraOptions : CameraOptions = {
        quality: 50,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
    }
  
  
    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string

      this.user.foto = "data:image/jpeg;base64," + imageData;imageData;
      this.objFirebase.collection('USUARIOS').doc(this.user.email).update({
        foto:this.user.foto
      })
     /* this.objFirebase.collection("Cosaslindas").doc("administrador").set({
        foto:this.foto,
        usuario:"administrador"
      });*/

  
      
    }, (err) => {
        //console.log(err);
    });
  }
  



}
