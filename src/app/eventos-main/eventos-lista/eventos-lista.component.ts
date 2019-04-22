import { Component, OnInit } from '@angular/core';
import { EventoServiceService } from '../evento-service.service';
import { Evento } from '../Evento';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventos-lista',
  templateUrl: './eventos-lista.component.html',
  styleUrls: ['./eventos-lista.component.css']
})
export class EventosListaComponent implements OnInit {

  eventos: Evento[];

  constructor(private eventoService: EventoServiceService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventos = this.eventoService.obtenerEventos();
  }

  comprarBoletos(evento: Evento){
    this.router.navigate([evento.id],{relativeTo:this.route});
  }
}
