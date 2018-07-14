export class encuestachofer{

    comentarios:string;
    combustible: string;
    calefaccion:string;
    limpiezaVehiculoExterno:string;
    limpiezaVehiculoInterno:string;
    foto:string
    
    constructor(){
    this.comentarios="";
    this.combustible="";
    this.calefaccion="";
    this.limpiezaVehiculoExterno="";
    this.limpiezaVehiculoInterno="";
    this.foto="";
    }
  
    dameJSON(){
      return JSON.parse( JSON.stringify(this));
    }
  }