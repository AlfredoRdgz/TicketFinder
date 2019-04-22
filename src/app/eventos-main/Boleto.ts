import { Evento } from './Evento';

export class Boleto {
    constructor(
        public idEvento: number,
        public comprador: string,
        public correo: string,
        public fila: string,
        public asiento: number,
        public costo: number
    ){}
  }