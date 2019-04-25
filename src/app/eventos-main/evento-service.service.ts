import { Injectable } from '@angular/core';
import { Evento } from './Evento';
import { Boleto } from './Boleto';

@Injectable({
  providedIn: 'root'
})
export class EventoServiceService {
  ultimoID = 1;
  listaEventos: Evento[] = [
    {id:this.ultimoID++,nombre:'Avengers Endgame',descripcion:'Película',fecha:'20/04/2019',hora:'20:00',lugar:'Cinepolis Ciudadela',filas:10,asientosXFila:15,boletos:[]},
    {id:this.ultimoID++,nombre:'Avengers Endgame',descripcion:'Película',fecha:'20/04/2019',hora:'15:00',lugar:'Cinepolis Galerías',filas:15,asientosXFila:20,boletos:[]}
  ];
  palabraBusqueda:String = '';

  constructor() { }

  agregarEvento(nombre:string ,descripcion:string, fecha:string, hora:string, lugar:string, filas:number, asientosXFila:number){
    let evento = new Evento(this.ultimoID++, nombre, descripcion, fecha, hora, lugar, filas, asientosXFila, []);
    this.listaEventos.push(evento);
    // Actualizar el emisor de detalles si corresponde
  }

  agregarBoleto(idEvento:number, comprador:string, correo:string, fila:string, asiento:number,costo:number){
    // Creando boleto
    let boleto = new Boleto(idEvento,comprador,correo,fila,asiento,costo);
    // Agregando el boleto vendido al evento
    let evento = this.listaEventos.find(evento=>evento.id == idEvento);
    evento.boletos.push(boleto);
    // Actualizar el emisor de detalles si corresponde
  }

  asignarBusqueda(palabra:String){
    this.palabraBusqueda = palabra;
    console.log("Palabra: "+this.palabraBusqueda);
  }

  obtenerEventos(): Evento[]{
    // Obtener los eventos de la BD que coincidan con palabraBusqueda y asignarlo a la lista de eventos
    this.palabraBusqueda = '';
    return this.listaEventos;
  }

  detalleEvento(idEvento:number):Evento{
    return this.listaEventos.find(evento => evento.id == idEvento);
  }

}
