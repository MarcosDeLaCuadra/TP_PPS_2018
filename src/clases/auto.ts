
export class auto{

    asignado:string;
    marca: string;
    modelo:string;
    año:string;
    patente:string;
    foto_frente: string;
    foto_izq:string;
    foto_der:string;
    activo:boolean;
    usuario:string;
    
    
  
    constructor(){
      this.asignado="";
      this.marca="";
      this.modelo="";
      this.año="";
      this.patente="";
      this.foto_frente="";
      this.foto_izq="";
      this.foto_der="";
      this.activo=true;
      this.usuario="";

    }
  
    dameJSON(){
      return JSON.parse( JSON.stringify(this));
    }
  }