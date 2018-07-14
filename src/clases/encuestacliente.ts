
export class encuestacliente{

    RespetoDeRuta:string;
    UsoDeCalefaccion:string
    amabilidad:string
    comentarios:string
    limpiezaVehiculo:string

    
    
    constructor(){
    this.RespetoDeRuta="";
    this.UsoDeCalefaccion="";
    this.amabilidad="";
    this.comentarios="";
    this.limpiezaVehiculo="";
   // this.foto="";
    }
  
    dameJSON(){
      return JSON.parse( JSON.stringify(this));
    }
  }