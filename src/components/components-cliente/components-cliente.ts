import { Component, OnInit , Output} from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { EventEmitter } from '@angular/core';
/**
 * Generated class for the ComponentsClienteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-cliente',
  templateUrl: 'components-cliente.html'
})
export class ComponentsClienteComponent {
  @Output()enviarDato:EventEmitter<string> = new EventEmitter<string>();
  output:any;
  usuario: string;
  precio:any = 0;
  origen: string = "banfield maipu 100";
  destino: string= "banfield maipu 1000";
  title: string = 'My first AGM project';
  lat: Number = -34.7366571;
  lng: Number = -58.3887564;
  kms:string;
  metros:string;  
  deshabilitado:boolean=true;
  estado:string="";
  fecha:Date;
  dir = undefined;
  text: string;
  viaje= { desde : '', hasta : '', hora_salida:'', c_personas:'', usuario:'', activo:true, precio:"", estado:""};

  constructor(public objFirebase:AngularFirestore) {
    this.usuario = localStorage.getItem("email");
    console.log(this.usuario);
    this.enviarDato.emit("estadoPendienteOutPut");
    this.text = 'Hello World';
  }
  Iniciar(){
    console.log(this.dir.destination)
    let fecha=new Date(this.fecha).getTime();
    console.log(fecha);
      localStorage.setItem('estado', 'buscando');
      this.estado= "buscando";
      this.viaje.desde=this.dir.destination;
      this.viaje.hasta=this.dir.origin;      
      this.viaje.usuario=this.usuario;
      this.viaje.precio= this.precio;
      this.viaje.estado= "pendienteSupervisor";
      this.objFirebase.collection('VIAJES').doc(this.viaje.usuario).set(this.viaje);
  
  }
  CancelarBusqueda(){
   // this.http.postCancelarViaje(this.usuario).subscribe(d=> {
      localStorage.setItem('estado', "");
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
  
  }

}
