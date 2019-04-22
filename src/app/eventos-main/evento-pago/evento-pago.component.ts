import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../Evento';
import { Boleto } from '../Boleto';
import { EventoServiceService } from '../evento-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento-pago',
  templateUrl: './evento-pago.component.html',
  styleUrls: ['./evento-pago.component.css']
})
export class EventoPagoComponent implements OnInit {

  @Input() arregloBoletos:Boleto[];
  @Input() evento:Evento;

  constructor(private servicioEvento: EventoServiceService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(!this.evento){
      this.evento = this.servicioEvento.detalleEvento(Number(this.router.url.split('/')[2]));
    }
    console.log(this.evento.descripcion);

  }
}
