import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';

/**
 * Generated class for the CambiarPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiar-password',
  templateUrl: 'cambiar-password.html',
})
export class CambiarPasswordPage {

  ListadoUsuarios:Observable<any[]>;
  email:string;
  passwordOld:string;
  passwordNew:string;
  repetirPassword:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public objFirebase:AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarPasswordPage');
  }

  CambiarPassword(){
    this.ListadoUsuarios= this.objFirebase.collection('USUARIOS').valueChanges();
    this.ListadoUsuarios.subscribe(x=>{    
      x.forEach(item=> {

        if(item.email == this.email && item.password == this.passwordOld){
          if(this.passwordNew.length >3){
            
            if(this.passwordNew == this.repetirPassword){
              
              this.objFirebase.collection('USUARIOS').doc(this.email).update({
                password:this.passwordNew
              });
              this.navCtrl.push(HomePage);
            }else{
              alert("Las contraseñas son distintas");
            }
          }else{
            alert("Contraseña tiene que tener mas de 3 caracteres");
          }
        }

      });
  });
  }

  VolverLogin(){
    this.navCtrl.push(HomePage);
  }

}
