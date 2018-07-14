export class viajes{


    desde:string;
    hasta:string;
    hora:string
    hora_salida:string
    usuario:string
    id_chofer:string
    id_auto:string
    aceptado:boolean
    estado:string
  
    constructor(mensaje:string){
     
    this.usuario="yo";
    this.desde='';
    this.hasta='';
    this.hora_salida='';
    this.hora='';
    
    }
  
    dameJSON(){
      return JSON.parse( JSON.stringify(this));
    }
  }