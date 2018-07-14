import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { HomePage } from '../home/home';
/**
 * Generated class for the RegistratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrate',
  templateUrl: 'registrate.html',
})
export class RegistratePage {

  email:string="";
  password:string="";
  nombre:string="";
  apellido:string="";
  direccion:string="";
  telefono:string="";
  tipo:string="cliente";
  camposIncorrectos:string;
  autoPropio:string="false";
  patente:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public objFirebase:AngularFirestore) {

  }

  Registrate(){
    if(this.tipo =="cliente"){
      if(this.ValidarEmail() && this.ValidarLenght(this.password, 'password') && this.ValidarLetras(this.nombre,"nombre") && this.ValidarNumeros(this.telefono,"telefono") && this.ValidarLenght(this.direccion,"direccion") && this.ValidarLetras(this.apellido,"apellido")){
        this.objFirebase.collection('USUARIOS').doc(this.email).set({ 
          activo:true,         
          email: this.email,
          password: this.password,
          nombre:this.nombre,
          telefono:this.telefono,
          direccion:this.direccion,
          tipo:this.tipo
        });
        this.navCtrl.setRoot(HomePage);
      }else{
        alert("Verifique campos " + this.camposIncorrectos);
    
      }
    }else{
      console.log("auto propio" + this.autoPropio)
      if(this.autoPropio == "false"){
        this.patente = "";
      }
      if(this.ValidarPatente() && this.ValidarEmail() && this.ValidarLenght(this.password, 'password') && this.ValidarLetras(this.nombre,"nombre") && this.ValidarNumeros(this.telefono,"telefono") && this.ValidarLenght(this.direccion,"direccion") && this.ValidarLetras(this.apellido,"apellido")){
        this.objFirebase.collection('USUARIOS').doc(this.email).set({  
          activo:true,       
          email: this.email,
          password: this.password,
          nombre:this.nombre,
          telefono:this.telefono,
          direccion:this.direccion,
          tipo:this.tipo,
          autoPropio: this.ReturnBooleanAutoPropio(),
          patente:this.patente
        });
        /*this.objFirebase.collection('VIAJES').doc(this.email).set({         
          usuario: this.email,       
          id_auto:this.patente,
          estado:"",
        });*/
        this.navCtrl.setRoot(HomePage);
      }else{
        console.log("Verifique campos " + this.camposIncorrectos);
    
      }
    } 
   
  }

  ReturnBooleanAutoPropio(){
    if(this.autoPropio == "false"){
      return false;
    }else{
      return true;
    }
  }

  ValidarPatente(){
    if(this.autoPropio == "false"){
      return true;
    }else{
      let patenteValidator = /^[A-Z]{3}\d{3}$/;  
      if(!patenteValidator.test(this.patente)){
        this.camposIncorrectos = ("patente");
        return false;
      }else{
        return true;
      } 
     
    }    
    
  }

  ValidarEmail(){
    let emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.ValidarLenght(this.email)){
      return emailValidator.test(this.email);
    }else{
      this.camposIncorrectos = ("email");
      return false;
    }
   // console.log(emailValidator.test(this.email));
  }

  ValidarLetras(soloLetras:string, campo:string){
    let letrasValidador = /^[a-zA-Z\s]*$/;
    if(this.ValidarLenght(soloLetras) && letrasValidador.test(soloLetras)){
      return true;
    }else{
      this.camposIncorrectos = (campo);
      return false;
    }
   // console.log(letrasValidador.test(soloLetras));
  }

  ValidarNumeros(soloNumeros:string, campo:string){
    let numberValidator =/^[0-9]*$/;
    if(this.ValidarLenght(soloNumeros) && numberValidator.test(soloNumeros)){
      return true;
    }else{
      this.camposIncorrectos = (campo);
      return false;
    }
    //console.log(numberValidator.test(soloNumeros));
  }

  ValidarLenght(data:string, campo?:string){
    if(data.length>3){
      return true;
    }else{
      console.log(campo)
      if(campo != ""){
        this.camposIncorrectos = (campo);
      }
      return false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistratePage');
  }

}
