import { Component, OnInit } from '@angular/core';
import { Evento } from '../Evento';
import { EventoServiceService } from '../evento-service.service';
import { Usuario } from '../../Usuario';
import { UsuariosService } from '../../usuarios.service';
import { Boleto } from '../Boleto';

@Component({
  selector: 'app-eventos-usuario',
  templateUrl: './eventos-usuario.component.html',
  styleUrls: ['./eventos-usuario.component.css']
})
export class EventosUsuarioComponent implements OnInit {

  eventosComprados: Evento[];
  asientosSeleccionados: Boleto[];
  usuarioActual: Usuario;

  constructor(private servicioEventos: EventoServiceService, private servicioUsuarios: UsuariosService) { }

  ngOnInit() {
    this.eventosComprados = this.servicioEventos.obtenerEventos().filter(
      (evento) => evento.boletos.findIndex(Boleto => Boleto.comprador == this.servicioUsuarios.sesionActual.usuario) != -1
    );

    document.getElementById('closeSpan').onclick = function () {
      document.getElementById('modal').style.display = "none";
    }
  }

  verDetalle(evento: Evento) {
    this.asientosSeleccionados = evento.boletos;
    document.getElementById('modal').style.display = "block";
  }


}
