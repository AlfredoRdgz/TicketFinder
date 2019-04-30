import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../Evento';

@Component({
  selector: 'app-evento-detalle',
  templateUrl: './evento-detalle.component.html',
  styleUrls: ['./evento-detalle.component.css']
})
export class EventoDetalleComponent implements OnInit {

  @Input() evento: Evento;
  dia: number;
  mes: string;

  constructor() { }

  ngOnInit() {
    this.dia = Number(this.evento.fecha.split('-')[2]);
    this.mes = this.evento.fecha.split('-')[1];
    this.mes === '01' ? this.mes = 'Ene':
    this.mes === '02' ? this.mes = 'Feb':
    this.mes === '03' ? this.mes = 'Mar':
    this.mes === '04' ? this.mes = 'Abr':
    this.mes === '05' ? this.mes = 'May':
    this.mes === '06' ? this.mes = 'Jun':
    this.mes === '07' ? this.mes = 'Jul':
    this.mes === '08' ? this.mes = 'Ago': 
    this.mes === '09' ? this.mes = 'Sep':
    this.mes === '10' ? this.mes = 'Oct':
    this.mes === '11' ? this.mes = 'Nov':
    this.mes === '12' ? this.mes = 'Dic':
    '-';
  }

}
