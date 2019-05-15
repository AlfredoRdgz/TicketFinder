import { Injectable, OnInit } from '@angular/core';
import { Evento } from './Evento';
import { Boleto } from './Boleto';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class EventoServiceService{
  
  
  ultimoID = 1;
  listaEventos: Evento[] = [];
  palabraBusqueda: string = '';
  observableEventos = new Subject<Evento[]>();

  constructor(private http: HttpClient,private servicioUsuario:UsuariosService) { }


  agregarEvento(nombre: string, descripcion: string, fecha: string, hora: string, lugar: string, filas: number, asientosXFila: number) {
    this.listaEventos.map((evento)=>{if(evento.id >= this.ultimoID) this.ultimoID = evento.id + 1;});
    let evento = new Evento(this.ultimoID++, nombre, descripcion, fecha, hora, lugar, filas, asientosXFila, []);
    this.listaEventos.push(evento);
    // Actualizar el emisor de detalles si corresponde
    let headers = new HttpHeaders({'Content-Type':'application/json','x-auth':this.servicioUsuario.tokenSesion});
    this.http.post('https://ticketfinder-rest.herokuapp.com/api/eventos',evento,{headers}).subscribe((res:HttpResponse<any>)=>{
        if(res.status != 201){
          console.log('Error en el alta del evento');
        }else{
          alert('Evento agregado al calendario');
        }
    });
  }

  agregarBoleto(idEvento: number, boleto: Boleto) {
    // Agregando el boleto vendido al evento
    let evento = this.listaEventos.find(evento => evento.id == idEvento);
    evento.boletos.push(boleto);
    let headers = new HttpHeaders({'Content-Type':'application/json','x-auth':this.servicioUsuario.tokenSesion});
    this.http.post('https://ticketfinder-rest.herokuapp.com/api/boletos',boleto,{headers}).subscribe((res:HttpResponse<any>)=>{
        if(res.status != 201){
          console.log('Error en el alta de boleto');
        }else{
          console.log('Boleto agregado al evento');
        }
    });
  }

  asignarBusqueda(palabra: string) {
    this.palabraBusqueda = palabra;
    if (this.palabraBusqueda) {
      this.listaEventos = [];
      this.http.get("https://ticketfinder-rest.herokuapp.com/api/eventos/buscar?nombre=" + this.palabraBusqueda).subscribe((data: Evento[]) => {
        for (let i = 0; i < data.length; i++) {
          let nuevoEvento = new Evento(data[i].id, data[i].nombre, data[i].descripcion, data[i].fecha, data[i].hora, data[i].lugar, data[i].filas, data[i].asientosXFila, []);
          // Agregando evento a la lista
          this.listaEventos.push(nuevoEvento);
        }
        this.observableEventos.next(this.listaEventos);
      });
    }else{
      return this.obtenerEventos();
    }
  }

  obtenerEventos(): Evento[] {
    // Obteniendo eventos especiales
    this.palabraBusqueda = '';
    this.listaEventos = [];
    this.http.get('https://ticketfinder-rest.herokuapp.com/api/eventos').subscribe((data: Evento[]) => {
      for (let i = 0; i < data.length; i++) {
        let nuevoEvento = new Evento(data[i].id, data[i].nombre, data[i].descripcion, data[i].fecha, data[i].hora, data[i].lugar, data[i].filas, data[i].asientosXFila, []);
        // Agregando evento a la lista
        this.listaEventos.push(nuevoEvento);
      }
      this.observableEventos.next(this.listaEventos);
    });
    // Obteniendo el último ID
    this.listaEventos.map((evento)=>{if(evento.id >= this.ultimoID) this.ultimoID = evento.id + 1;});

    return this.listaEventos;
  }

  detalleEvento(idEvento: number): Evento {
    let evento = this.listaEventos.find(evento => evento.id == idEvento);
    // Agregar boletos con HTTP request
    this.http.get('https://ticketfinder-rest.herokuapp.com/api/boletos/' + idEvento).subscribe((data: Boleto[]) => {
      for (let j = 0; j < data.length; j++) {
        let nuevoBoleto = data[j];
        evento.boletos.push(nuevoBoleto);
      }
    });
    // Regresar el evento con los boletos actualizados
    return evento;
  }

}
