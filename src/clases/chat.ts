
export class chat{

  usuario:string;
  mensaje: string;
  tiempo:string;
  id:string;
  nombre:string;
  apellido: string;
  direccion:string;
  tel:string;
  activo:boolean;
  tipo:string;
  foto:string;
  email:string;
  auto:string;
  contraseña:string

  constructor(mensaje:string){
    this.mensaje=mensaje;
    this.tiempo=Date();
    this.usuario="yo";
    this.nombre='';
  this.apellido='';
  this.direccion='';
  this.tel='';
  this.activo=true;
  this.tipo='';
  this.foto='';
  this.email='';
  this.auto="";
  this.contraseña='' ; 
  }

  dameJSON(){
    return JSON.parse( JSON.stringify(this));
  }
}