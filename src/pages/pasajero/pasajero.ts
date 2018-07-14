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
//import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the SupervisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pasajero',
  templateUrl: 'pasajero.html',
})
export class PasajeroPage {

  coleccionTipadaFirebase:AngularFirestoreCollection<viajes>;
  ListadoDeChatsObservable:Observable<viajes[]>;

  //scaner de datos
 // options:BarcodeScannerOptions;
  ChoferObservable:Observable<any>;
  scannedData:any={};
  coleccionFirebase:AngularFirestoreCollection<chat>;
  ListadoUsuariosObservable:Observable<chat[]>;
  ListaDeUsuarios:Array<chat>;
  //Encuesta
  encuesta:boolean=false;
  amabilidad:any="Bueno";
  limpiezaVehiculo:any="Buena";
  ruta:any="Si";
  calefaccion:any="No";
  comentarios:string="";
  datosEncuesta = {};
  //para los choferes    
  usuario: string;
  precio:any = 0;
  origen: string;
  destino: string;    
  lat: Number = -34.7366571;
  lng: Number = -58.3887564;
  kms:string;
  deshabilitado:boolean=true;
  estado:string="";
  // fecha:Date;
  dir = undefined;
  desde:string;
  hasta:string;
  chofer:string="";
  verDatosChofer:boolean=false;
  datosChofer:any={email :"", nombre:"", direccion:"", patente:""};
  viaje= { desde : '', hasta : '', hora_salida:'', c_personas:'', usuario:'', activo:true, precio:"", estado:""};     
  //chofer={nombre:''}
  //rutausuario:string
  esperando:boolean;   
  //  viaje= { desde : '', hasta : '', hora_salida:'', c_personas:'', usuario:'', activo:true};

  user= { email : '', password : '123456', nombre:'', apellido:'', direccion:'',
  telefono:'', tipo:'', foto:'', foto2:'', foto3:'', mensaje:'aca esta el menaje', 
  usuario:'yo', activo:true};

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
  ////////////////////////////MARCOS//////////////////////////////
  ScanDatosChofer(){
    console.log(this.chofer)
    this.verDatosChofer= true;
    this.ChoferObservable = this.objFirebase.collection('USUARIOS').doc(this.chofer).valueChanges();
    this.ChoferObservable.subscribe(data => {   
      console.log(data);
     this.datosChofer =(data);
    });
  }
  EnviarEncuesta(){
    this.datosEncuesta=  {
      amabilidad: this.amabilidad,
      limpiezaVehiculo: this.limpiezaVehiculo,
      RespetoDeRuta: this.ruta, UsoDeCalefaccion: this.calefaccion,
      comentarios:this.comentarios,
      chofer:this.chofer,
      cliente:this.user.email 
    };  
    
    this.objFirebase.collection('EncuestaClientes').add(this.datosEncuesta).then(d => {  
      this.objFirebase.collection('VIAJES').doc(this.user.email).delete().then(x=> {
        this.estado="";
      });
    });
  }
  AceptarEncuesta(){
    this.encuesta=true;
   /* this.objFirebase.collection('VIAJES').doc(this.user.email).delete().then(x=> {
      this.estado="";
    });*/
  }
  RechazarEncuesta(){
    this.objFirebase.collection('VIAJES').doc(this.user.email).delete().then(x=> {
      this.estado="";
    });
  }
   
  Iniciar(){
    console.log(this.dir.destination)
    //let fecha=new Date(this.fecha).getTime();
   // console.log(fecha);
      //localStorage.setItem('estado', 'buscando');
      //this.estado= "buscando";
      this.viaje.desde=this.dir.destination;
      this.viaje.hasta=this.dir.origin;      
      this.viaje.usuario=this.user.email;
      this.viaje.precio= this.precio;
      this.viaje.estado= "pendienteSupervisor";
      this.objFirebase.collection('VIAJES').doc(this.viaje.usuario).set(this.viaje).then(x=> {
        this.estado="pendienteSupervisor";
      });
  
  }
  CancelarBusqueda(){
   // this.http.postCancelarViaje(this.usuario).subscribe(d=> {
    //  localStorage.setItem('estado', "");
      this.estado= "";
    // this.viajando= true;
   // });
  }
  Precio(){
    console.log(this.kms)
    console.log(Number(this.kms))
    this.precio = parseFloat(this.kms);
    this.precio = this.precio * 100;
  }

  getDirection() {
   // console.log(new Date(this.fecha).getTime())
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
  
  }
   ////////////////////////////END MARCOS//////////////////////////////
  constructor(public camera:Camera,public navCtrl: NavController, public navParams: NavParams, public objFirebase:AngularFirestore,public objFirebase1:AngularFirestore) {
    //this.ver=true
    this.user=this.navParams.data
    localStorage.setItem("email", this.user.email);
   
  }

  CancelarViaje(){

    this.viaje.usuario=this.user.email
    this.objFirebase.collection('HistorialViajes').add({
      usuario:this.user.email,
      desde:this.viaje.desde,
      hasta:this.viaje.hasta,
      estado:"CanceladoUsuario"
    });
    this.objFirebase.collection('VIAJES').doc(this.user.email).delete();
    this.estado="";
   // this.esperar()
  
  }
 

  RecibirDato(dato:string){
      console.log(dato);
  }

  ionViewDidEnter(){
    this.coleccionTipadaFirebase= this.objFirebase.collection('VIAJES');
    this.ListadoDeChatsObservable=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeChatsObservable.subscribe(x => {
      
         console.info("conexión correcta con Firebase",x);
        x.forEach(usuario => {

          console.log("usuario.usuario"+ usuario.usuario)
          console.log("this.user.email"+this.user.email)
          if(usuario.usuario== this.user.email){
            //console.info("EL VIAJE FUE ACEPTADO")
            this.estado= usuario.estado;
            this.viaje.desde= usuario.desde;
            this.viaje.hasta = usuario.hasta;
            this.desde= usuario.desde;
            this.hasta = usuario.hasta;
            console.log(this.desde + this.hasta)
            console.log("estado actual"+this.estado);
            this.esperando=false;           
            this.chofer=usuario.id_chofer;
            this.verdata(this.chofer);
            //console.info("casrgsa el usuario")
          }
           
          this.verdata("");    
       });       
       
     })
 
  }

  solicitar(){
    this.viaje.usuario=this.user.email

    this.objFirebase.collection('VIAJES').doc(this.user.email).set(this.viaje)
    this.esperar()
  
  }
 
  esperar(){
    //console.info('AFDENTRP DE ESPETRAR')
    this.esperando=true
  }

  verdata(ruta){
    let datos=this.objFirebase.collection('USUARIOS').doc('chofer@gmail.com')
        //console.info('LOS DATOS DEL CHOFER'+ datos)
  }

  VerChofer(ruta:string){
    ruta="cofer@gmail.com";
    console.info(ruta)
        let aux=this.objFirebase.collection<chat>('USUARIOS').doc(ruta)
    
        
        this.coleccionFirebase= this.objFirebase.collection<chat>('USUARIOS');
        this.ListadoUsuariosObservable=this.coleccionFirebase.valueChanges();
      this.ListadoUsuariosObservable.subscribe(x => {
            console.info("conexión correcta con Firebase",x);
            x.forEach(usuario => {
              this.ListaDeUsuarios.push(usuario);
            });
         
        })
         console.log("datos cargados en la lista de usuarios");
    
    
        
       //anda de aca para abajo
        console.info('listado de usuarios')
        this.ListaDeUsuarios.forEach(usu => {
          console.info(usu)
          if (usu.email=="chofer@gmail.com") {
            console.info("entro en el if")           
          }
    
    
        });
    
        return 
  }

}
