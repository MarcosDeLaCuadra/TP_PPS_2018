export class choferes{


    id:string;
    auto:string;
   

  
    constructor(mensaje:string){
    this.id=""
    this.auto=""
    }
  
    dameJSON(){
      return JSON.parse( JSON.stringify(this));
    }
  }