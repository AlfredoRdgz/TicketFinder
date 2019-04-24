import { Component, OnInit } from '@angular/core';
import { ServicioCompraService } from '../servicio-compra.service';
import { Pago } from '../Pago';

@Component({
  selector: 'app-evento-confirmacion',
  templateUrl: './evento-confirmacion.component.html',
  styleUrls: ['./evento-confirmacion.component.css']
})
export class EventoConfirmacionComponent implements OnInit {

  detallePago:Pago;

  constructor(private servicioCompra:ServicioCompraService) { }

  ngOnInit() {
    this.detallePago = this.servicioCompra.detallesCompra();
    
  }

}
