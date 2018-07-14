import { Component } from '@angular/core';

/**
 * Generated class for the ComponentsEncuestaClienteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-encuesta-cliente',
  templateUrl: 'components-encuesta-cliente.html'
})
export class ComponentsEncuestaClienteComponent {
  amabilidad:any="Bueno";
  limpiezaVehiculo:any="Buena";
  ruta:any="Si";
  calefaccion:any="No";
  comentario:string;

  text: string;

  constructor() {
    console.log('Hello ComponentsEncuestaClienteComponent Component');
    this.text = 'Hello World';
  }

  EnviarEncuesta(){
    
  }

}
