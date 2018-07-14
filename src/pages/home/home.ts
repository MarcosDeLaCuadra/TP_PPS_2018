import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { SalaMensajesPage } from '../sala-mensajes/sala-mensajes';
import { RegistratePage } from '../registrate/registrate';
import { chat } from '../../clases/chat';
import { Observable } from 'rxjs/Observable';
import { ListPage } from '../list/list';

import { SuperUsuarioPage } from '../super-usuario/super-usuario';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coleccionTipadaFirebase:AngularFirestoreCollection<chat>;
  ListadoDeChatsObservable:Observable<chat[]>;
  ListadoDeUsuariosObservable:Observable<any>;
  log:boolean
  reg:boolean
  usuario:string
  user= { email : 'supervisor@gmail.com', password : '123456', nombre:'', apellido:'', direccion:'',
  telefono:'', tipo:'', foto:'', foto2:'', foto3:'', mensaje:'aca esta el menaje', 
  usuario:'yo', tiempo:'ahora', activo:false};
  ListaDeUsuarios:Array<chat>;


  constructor(public navCtrl: NavController, private auth:AuthProvider,
  public Alert:AlertController, public objFirebase: AngularFirestore,private push: Push) {
    this.PushSetUp();
    this.log=true;

   /* this.objFirebase.collection('Autos').doc("qqq321").set({
      patente:"qqq321",
      titular:"lalo landa",
      ocupado: false,
      marca:"fiat",
      color:"verde",
      choferActual:""
    }).then(d => {
     console.log("asdfasdfasdfasdfsadf")
    });*/
   // this.cargarUsuario()

  }
  Abel(){
    this.user.email= "abel@gmail.com";
    this.login();
  }
  Chofer(){
    this.user.email= "chofer@gmail.com";
    this.login();
  }
  Supervisor(){
    this.user.email= "supervisor@gmail.com";
    this.login();
  }
  Superusuario(){
    this.user.email= "superusuario@gmail.com";
    this.login();
  }
  PushSetUp(){
    

    const options: PushOptions = {
      android: {
        senderID:"205822604006"
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   
   pushObject.on('registration').subscribe((registration: any) => {
     console.log('Device registered', registration);
     /*this.objFirebase.collection('TokenPush').add(registration).then(d => {          
     });*/
    });
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  public cargarUsuario(){

    this.coleccionTipadaFirebase= this.objFirebase.collection<chat>('USUARIOS', ref=> ref.orderBy('tiempo','desc'));
    this.ListadoDeChatsObservable=this.coleccionTipadaFirebase.valueChanges();
  this.ListadoDeChatsObservable.subscribe(x => {
        console.info("conexión correcta con Firebase",x);
        x.forEach(usuario => {
          this.ListaDeUsuarios.push(usuario);
        });
     // this.mostrarSpinner=false;
    })
     console.log("fin de ionViewDidEnter");


    
   //anda de aca para abajo
    console.info('revisocredrio')
    this.ListaDeUsuarios.forEach(usu => {
      if (usu.email == this.user.email) {
        this.usuario=usu.nombre    
        console.info('aca esata:', usu);
        //this.mostrarSpinner=false
        this.user.nombre=usu.nombre
        this.user.apellido=usu.apellido
        this.user.direccion=usu.direccion
        this.user.telefono=usu.tel
        this.user.activo=usu.activo
        this.user.tipo=usu.tipo
        this.user.email=usu.email
        this.user.foto=usu.foto
        console.info('usuario cargado:'+this.user)
        return

      }

     // else this.nuevoMensaje();

    });

    return 
  }
  guardar(){


    this.objFirebase.collection('USUARIOS').doc(this.user.email).set(this.user)

  }

  login()
  {
    ///////////
    this.ListadoDeUsuariosObservable = this.objFirebase.collection('USUARIOS').valueChanges();
    this.ListadoDeUsuariosObservable.subscribe(data => {
      let flag = false;
      data.forEach(elment => {       
       if(elment.email == this.user.email && elment.password == this.user.password){
         flag=true;
         if(elment.tipo=="chofer"){
          this.navCtrl.setRoot(ListPage, this.user.email) 
        }else if(elment.tipo=="superUsuario"){
          this.navCtrl.setRoot(SuperUsuarioPage) 
        }else{
          this.navCtrl.push(SalaMensajesPage, this.user.email);  
        }
           
       }
      });
      if(flag == false){
        let alert = this.Alert.create({
          title: 'Error',
          subTitle: 'Usuario y contraseña incorrecta',
          buttons: ['Aceptar']
        });
        alert.present();
      }
     
    });
    ////////////
  
   /* console.log(this.user.email+ " "+this.user.password )
      this.auth.loginUser(this.user.email,this.user.password ).then((user) => {
      // this.cargarUsuario()
       this.navCtrl.push(SalaMensajesPage, this.user.email)
        }
      )
       .catch(err=>{
        let alert = this.Alert.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })*/
    }

  
  signin(){
       
   
    this.auth.registerUser(this.user.email,this.user.password)
    .then((user) => {
      this.guardar();
      this.auth.logout();
      // El usuario se ha creado correctamente
    })
    .catch(err=>{
      let alert = this.Alert.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })

  }


  
  registrarse(){
    this.navCtrl.push(RegistratePage);
    //this.log=false
    //this.reg=true
  }

  isValid(control: FormControl){
  
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = re.test(control.value);
      
      if (!result) {
        return {
          'email:validation:fail' : true
        }
      }
      
      return null;
  }

}
