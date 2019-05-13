import { Injectable } from '@angular/core';
import { Evento } from './Evento';
import { Boleto } from './Boleto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventoServiceService {
  ultimoID = 1;
  listaEventos: Evento[] = [];
  palabraBusqueda:String = '';

  constructor(private http:HttpClient) { 
    // Obteniendo eventos
    this.http.get('http://localhost:3000/api/eventos').subscribe( (data:Evento[]) =>{
      for (let i=0; i < data.length; i++){
        let nuevoEvento = new Evento(data[i].id,data[i].nombre,data[i].descripcion,data[i].fecha,data[i].hora,data[i].lugar,data[i].filas,data[i].asientosXFila,[]);
        // Agregando evento a la lista
        this.listaEventos.push(nuevoEvento);
      }
    });
  }

  agregarEvento(nombre:string ,descripcion:string, fecha:string, hora:string, lugar:string, filas:number, asientosXFila:number){
    let evento = new Evento(this.ultimoID++, nombre, descripcion, fecha, hora, lugar, filas, asientosXFila, []);
    this.listaEventos.push(evento);
    // Actualizar el emisor de detalles si corresponde
    console.log(JSON.stringify(evento));
  }

  /*agregarBoleto(idEvento:number, comprador:string, correo:string, fila:string, asiento:number,costo:number){
    // Creando boleto
    let boleto = new Boleto(idEvento,comprador,correo,fila,asiento,costo);
    // Agregando el boleto vendido al evento
    let evento = this.listaEventos.find(evento=>evento.id == idEvento);
    evento.boletos.push(boleto);
    // Actualizar el emisor de detalles si corresponde
  }*/

  agregarBoleto(idEvento:number,boleto:Boleto){
    // Agregando el boleto vendido al evento
    let evento = this.listaEventos.find(evento=>evento.id == idEvento);
    evento.boletos.push(boleto);
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
    let evento = this.listaEventos.find(evento => evento.id == idEvento);
    // Agregar boletos con HTTP request
    this.http.get('http://localhost:3000/api/boletos/'+idEvento).subscribe((data:Boleto[])=>{
      for (let j=0; j < data.length; j++){
        let nuevoBoleto = data[j];
        evento.boletos.push(nuevoBoleto);
      }
    });
    // Regresar el evento con los boletos actualizados
    return evento;
  }

}
