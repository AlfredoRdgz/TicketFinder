import { Component, OnInit, Input } from '@angular/core';
import { Boleto } from '../Boleto';
import { Evento } from '../Evento';
import { EventoServiceService } from '../evento-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento-compra',
  templateUrl: './evento-compra.component.html',
  styleUrls: ['./evento-compra.component.css']
})
export class EventoCompraComponent implements OnInit {

  @Input() evento:Evento;

  constructor(private servicioEvento: EventoServiceService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(!this.evento){
      this.evento = this.servicioEvento.detalleEvento(Number(this.router.url.split('/')[2]));
    }
    console.log(this.evento.descripcion);

  }

}
