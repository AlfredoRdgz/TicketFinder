import { Component, OnInit, Input } from '@angular/core';
import { EventoServiceService } from '../evento-service.service';
import { Boleto } from '../Boleto';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioCompraService } from '../servicio-compra.service';

@Component({
  selector: 'app-evento-boletos',
  templateUrl: './evento-boletos.component.html',
  styleUrls: ['./evento-boletos.component.css']
})
export class EventoBoletosComponent implements OnInit {
  @Input() cancelable:boolean;
  private asientoDisponible = 'assets/images/seat_0.png';
  asientosSeleccionados: Boleto[];
  boletosPorComprar = 0;



  constructor(private servicioCompra:ServicioCompraService,private servicioEvento: EventoServiceService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.asientosSeleccionados = this.servicioCompra.asientosSeleccionados;
  }

  cancelarBoleto(boleto: Boleto) {
    this.servicioCompra.cancelarBoleto(boleto);
    document.querySelector(`#fila${boleto.fila} #asiento${boleto.asiento}`).querySelector('img').src = this.asientoDisponible;
  }


}
