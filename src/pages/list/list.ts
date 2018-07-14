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
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'   
})
export class ListPage {

  coleccionTipadaFirebase:AngularFirestoreCollection<viajes>;
  ListadoDeChatsObservable:Observable<viajes[]>;
  ListadodeviajesObservable:Array<viajes[]>;
  //para los choferes
  //pedir auto
  colecciondechoferes:AngularFirestoreCollection<choferes>;
  ListadodechoferesObservable:Observable<any[]>;
  ListaEsperandoViaje:Observable<any[]>;
  ListadodeAutos:Observable<any[]>;
  mostrarBotonPedirAuto:boolean =false;
  encuestaAuto:boolean=false;
  autoPropio:boolean;
  patente:string="";
  autos:any[]= [];
  estoyEnLista:boolean=false;
  //fin pedir auto
  //ENCUESTA
  encuesta:boolean=false;
  limpiezaVehiculoInterno:string="Buena";
  limpiezaVehiculoExterno:string="Buena";
  combustible:string="Si";
  calefaccion:string="Si";
  comentarios:string="";
  //FINAL ENCUESTA
  ListaDeUsuarios:Array<viajes>;
  asig:boolean
  ver:boolean
  enCurso:boolean;
  chofer={nombre:''}
  rutausuario:string;
 
  user= { email : '', password : '123456', nombre:'', apellido:'', direccion:'',
  telefono:'', tipo:'', foto:'', foto2:'', foto3:'', mensaje:'aca esta el menaje', 
  usuario:'yo', activo:true};

  asignando:boolean
  viaje:viajes
  verpasajero:boolean
  lat: Number = -34.7366571;
  lng: Number = -58.3887564;
  dir = undefined;

  verhistorial:boolean;
  ListadoViajes:Array <any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public objFirebase:AngularFirestore) {
    this.ver=true
    this.user.email=this.navParams.data
    this.ListaDeUsuarios=new Array()
    this.enCurso= false;
    

  }

  ionViewDidEnter(){      
    this.ActualizarBusquedas();
  }

  EnviarEncuesta(){
   let datosEncuesta=  {
      limpiezaVehiculoInterno:this.limpiezaVehiculoInterno,
      limpiezaVehiculoExterno:this.limpiezaVehiculoExterno,
      combustible:this.combustible,
      calefaccion:this.calefaccion,
      comentarios:this.comentarios,
      chofer:this.user.email
    };  
    
    this.objFirebase.collection('EncuestaChofer').add(datosEncuesta).then(d => {  
     this.encuesta=false;     
    });
    this.objFirebase.collection('USUARIOS').doc(this.user.email).update({
      encuestaAuto:false
    });
  }
  AceptarEncuesta(){
    this.encuesta=true;
   /* this.objFirebase.collection('VIAJES').doc(this.user.email).delete().then(x=> {
      this.estado="";
    });*/
  }

  RechazarEncuesta(){
    this.objFirebase.collection('USUARIOS').doc(this.user.email).update({
      encuestaAuto:false
    });
  }

  AgregarListaChoferes(){
    // añadir qr con valor en vez de presionar el boton
    this.objFirebase.collection('LISTADECHOFERES').doc(this.user.email).set({
      auto:this.patente,
      id:this.user.email,
      idchofer:this.user.email
    });
    this.estoyEnLista= true;
  }

  DevolverVehiculo(){
    console.log(this.user.email)
    this.estoyEnLista=false;
    
    this.objFirebase.collection('USUARIOS').doc(this.user.email).update({
      patente:"",
      encuestaAuto:false
    });
    this.encuestaAuto=false;
    this.objFirebase.collection('Autos').doc(this.patente).update({
      ocupado:false,
      choferActual:""
    }).then(x=>{ 
      this.patente= "";
      this.mostrarBotonPedirAuto= false;    
     });
    this.objFirebase.collection('LISTADECHOFERES').doc(this.user.email).delete();
    
  }

  TomarVehiculo(patente:string){
    this.encuestaAuto=true;
    this.objFirebase.collection('USUARIOS').doc(this.user.email).update({
      patente:patente,
      encuestaAuto:true
    }).then(x=>{
      
      this.objFirebase.collection('Autos').doc(patente).update({
        ocupado:true,
        choferActual:this.user.email
      });
    });
  }

  PedirAuto(){
    this.ListadodechoferesObservable= this.objFirebase.collection('Autos').valueChanges();
    this.ListadodechoferesObservable.subscribe(x=>{  
      this.mostrarBotonPedirAuto= false; 
      this.autos=[];       
      x.forEach(item=> {
        if(item.ocupado == false){
          this.autos.push(item);
          this.mostrarBotonPedirAuto= true; 
        }
      });
          
    });
  }

  TerminarViaje(){
    this.objFirebase.collection('VIAJES').doc(this.viaje.usuario).update({         
      estado:"Finalizado"
    }).then(x => {
      this.viaje.estado= "Finalizado";
      this.objFirebase.collection('HistorialViajes').add(this.viaje).then(d => {
        this.ListaDeUsuarios= [];
        this.ActualizarBusquedas();
      });
      
    });
    this.ver= true;
    this.enCurso=false;
  }

  Aceptar(ruta){

      this.objFirebase.collection('VIAJES').doc(ruta).update({
        aceptado:true,
        estado:"EnCurso"
      });
      this.ver= false;
      this.enCurso=true;

  }


 Pasajero(ruta){

  this.verpasajero=true
  let pasajero=new choferes("")


  let Ref=this.objFirebase.collection('USUARIOS').doc(ruta)

  console.info(Ref.ref.id)

  var citiesRef = this.objFirebase.collection("LISTADECHOFERES");

  var query = citiesRef.ref.where("id", "==", "chofer");
  console.info("la variablequerry: "+query)
    
}
ActualizarBusquedas(){
  //verifica si esta en la lista de choferes
  this.RevisarListaDeChoferes();

  this.ListadodechoferesObservable= this.objFirebase.collection('USUARIOS').valueChanges();
  this.ListadodechoferesObservable.subscribe(x=>{    
    x.forEach(item=> {
      if(item.email == this.user.email ){
        this.encuestaAuto= item.encuestaAuto;
        this.patente = item.patente;
        this.autoPropio= false;
      }
    })
  });

  this.coleccionTipadaFirebase= this.objFirebase.collection('VIAJES');
  this.ListadoDeChatsObservable=this.coleccionTipadaFirebase.valueChanges();
  this.ListadoDeChatsObservable.subscribe(x => {
      console.info("conexión correcta con Firebase",x);
     x.forEach(usuario => {          
       if (usuario.id_chofer==this.user.email && usuario.estado =="pendienteChofer" ){
         this.viaje=new viajes('')
         this.viaje=usuario
         this.ListaDeUsuarios.push(usuario);            
       }
       if (usuario.id_chofer==this.user.email && usuario.estado =="EnCurso" ){
         this.ver= false;
         this.enCurso=true;
         this.viaje=new viajes('');
         this.viaje=usuario;
         this.dir = {
           origin: usuario.desde,
           destination: usuario.hasta,
           optimizeWaypoints: true,
           travelMode: 'DRIVING',
         };
         console.log(this.viaje)
       
       }
      // console.info(this.ListaDeUsuarios)

    });
  });
 }

 RevisarListaDeChoferes(){
  this.ListaEsperandoViaje= this.objFirebase.collection('LISTADECHOFERES').valueChanges();
  this.ListaEsperandoViaje.subscribe(x=>{    
    x.forEach(item=> {
      if(item.id == this.user.email ){
        this.estoyEnLista= true;
      }
    })
  });
 }
 CancelarViaje(){

 // this.viaje.usuario=this.user.email
  this.objFirebase.collection('HistorialViajes').add({
    usuario:this.viaje.usuario,
    desde:this.viaje.desde,
    hasta:this.viaje.hasta,
    estado:"CanceladoChofer"
  }).then(x=>{
    this.objFirebase.collection('VIAJES').doc(this.viaje.usuario).update({
      estado:"pendienteSupervisor"
    });
  });
  //
  this.viaje.estado= "pendienteSupervisor";  
  

}

historial(){

  this.verhistorial=true

  this.ListadodechoferesObservable= this.objFirebase.collection('HistorialViajes').valueChanges();
  this.ListadodechoferesObservable.subscribe(x=>{         
  console.info('aca esta el listado de viajes')
  console.info(x)  
      x.forEach(item=> {       
        if(item.id_chofer=="chofer@gmail.com"){
          if(item.estado=="Finalizado"){
            console.info("este viaje es del chofer" + item) 
            console.info(item) 
            this.ListadoViajes.push(item)
          }
        }
      });
          
    });
  }
    
  ocultar(){

    this.verhistorial=false
  }
  
}


