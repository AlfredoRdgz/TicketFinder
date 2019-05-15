import { Component, OnInit } from '@angular/core';
import { Evento } from '../Evento';
import { EventoServiceService } from '../evento-service.service';
import { Usuario } from '../../Usuario';
import { UsuariosService } from '../../usuarios.service';
import { Boleto } from '../Boleto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos-usuario',
  templateUrl: './eventos-usuario.component.html',
  styleUrls: ['./eventos-usuario.component.css']
})
export class EventosUsuarioComponent implements OnInit {

  eventosComprados: Evento[];
  asientosSeleccionados: Boleto[];
  usuarioActual: Usuario;

  constructor(private servicioEventos: EventoServiceService, private servicioUsuarios: UsuariosService, private http: HttpClient) { }

  ngOnInit() {
    this.servicioEventos.obtenerEventosComprados(this.servicioUsuarios.correoSesion).then((lista: any[]) => {
      this.eventosComprados = lista;
    }).catch((lista: Evento[]) => {
      this.eventosComprados = lista;
    });

    document.getElementById('closeSpan').onclick = function () {
      document.getElementById('modal').style.display = "none";
    }
  }

  verDetalle(evento: Evento) {
    this.asientosSeleccionados = [];
    this.http.get('https://ticketfinder-rest.herokuapp.com/api/comprado/?correo=' + this.servicioUsuarios.correoSesion + "&idEvento=" + evento.id).subscribe((data: Boleto[]) => {
      for (let j = 0; j < data.length; j++) {
        let nuevoBoleto = data[j];
        this.asientosSeleccionados.push(nuevoBoleto);
      }
      document.getElementById('modal').style.display = "block";
    });
  }


}
