export class Pago {
    constructor(
      public opcion: string,
      public nombre: string,
      public numero: number,
      public codigo: number,
      public fecha: string,
      public correo: string,
      public pago:number
    ){}
  }