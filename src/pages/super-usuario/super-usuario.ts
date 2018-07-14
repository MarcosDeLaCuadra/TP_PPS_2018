import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**
 * Generated class for the SuperUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-super-usuario',
  templateUrl: 'super-usuario.html',
})
export class SuperUsuarioPage {

  ListadoDeUsuariosObservable:Observable<any>;
  suspender:boolean=true;
  habilitar:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public objFirebase: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuperUsuarioPage');
  }

  Suspender(){
    this.suspender=true;
    this.habilitar=false;
    this.ListadoDeUsuariosObservable = this.objFirebase.collection('USUARIOS').valueChanges();
    this.ListadoDeUsuariosObservable.subscribe(data => {   
     
    });
  }

  Hablitilar(){
    this.suspender=false;
    this.habilitar=true;
    this.ListadoDeUsuariosObservable = this.objFirebase.collection('USUARIOS').valueChanges();
    this.ListadoDeUsuariosObservable.subscribe(data => {   
     
    });
  }

  HabilitarUsuario(id:string){
    console.log(id)
    this.objFirebase.collection('USUARIOS').doc(id).update({
      activo:true
    });
  }

  SuspenderUsuario(id:string){
    console.log(id)
    this.objFirebase.collection('USUARIOS').doc(id).update({
      activo:false
    });
  }

  

}
