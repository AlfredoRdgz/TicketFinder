import { Boleto } from './Boleto';

export class Evento {
    constructor(
      public id: number,
      public nombre: string,
      public descripcion: string,
      public fecha: string,
      public hora: string,
      public lugar: string,
      public filas: number,
      public asientosXFila: number,
      public boletos: Boleto[]
    ){}
  }