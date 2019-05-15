import { Component, OnInit } from '@angular/core';
import { EventoServiceService } from '../evento-service.service';
import { Evento } from '../Evento';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eventos-lista',
  templateUrl: './eventos-lista.component.html',
  styleUrls: ['./eventos-lista.component.css']
})
export class EventosListaComponent implements OnInit {

  eventos: Evento[];
  suscripcionEventos: Subscription;

  constructor(private eventoService: EventoServiceService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventoService.obtenerEventos().then((lista:Evento[])=> this.eventos = lista).catch((lista:Evento[])=> this.eventos = lista);
    this.suscripcionEventos = this.eventoService.observableEventos.subscribe(
      (arreglo)=>{
        this.eventos = arreglo;
      },
      (error)=>{
        console.log(error);
      },()=>{
        console.log('Completado');
      }
    )
  }

  comprarBoletos(evento: Evento){
    this.router.navigate([evento.id],{relativeTo:this.route});
  }
}
