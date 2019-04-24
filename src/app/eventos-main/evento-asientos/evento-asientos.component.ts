import { Component, OnInit, Input, Output } from '@angular/core';
import { EventoServiceService } from '../evento-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Boleto } from '../Boleto';
import { Evento } from '../Evento';
import { ServicioCompraService } from '../servicio-compra.service';

@Component({
  selector: 'app-evento-asientos',
  templateUrl: './evento-asientos.component.html',
  styleUrls: ['./evento-asientos.component.css']
})
export class EventoAsientosComponent implements OnInit {
  private asientoDisponible = 'assets/images/seat_0.png';
  private asientoOcupado = 'assets/images/seat_1.png';
  private asientoSeleccionado = 'assets/images/seat_5.png';
  private asientoDiscapacidad = 'assets/images/seat_4.png';



  @Input() evento: Evento;
  filas: string[] = [];
  columnas: number[] = [];
  //@Output() asientosSeleccionados: Boleto[] = this.servicioCompra.asientosSeleccionados;


  constructor(private servicioCompra: ServicioCompraService,private servicioEvento: EventoServiceService,private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    if(!this.evento){
      let id = Number(this.router.url.split('eventos/')[1]);
      this.evento = this.servicioEvento.detalleEvento(id);
    }
    for (let i = 0; i < this.evento.filas; i++) {
      this.filas.push(String.fromCharCode(65 + i));
    }
    for (let i = 1; i <= this.evento.asientosXFila; i++) {
      this.columnas.push(i);
    }
  }

  elegirBoleto(event, fila, asiento): void {
    let boleto = this.servicioCompra.verBoleto(fila,asiento);
    if (!boleto && this.servicioCompra.puedeApartar()) {
      // Si el boleto está disponible y no excede el máximo
      this.servicioCompra.agregarBoleto(new Boleto(this.evento.id, '', '', fila, asiento, 50.0));
      event.currentTarget.querySelector('img').src = this.asientoSeleccionado;
    } else if (boleto) {
      // Si el boleto ya fue seleccionado se cancela
      this.cancelarBoleto(boleto);
      event.currentTarget.querySelector('img').src = this.asientoDisponible;
    } else if (this.servicioCompra.asientosSeleccionados.length > 0) {
      // Si el boleto está disponible pero ya se excedió el máximo quita el primero y luego inserta el seleccionado
      let asientoPorQuitar = this.servicioCompra.quitarPrimero();
      document.querySelector(`#fila${asientoPorQuitar.fila} #asiento${asientoPorQuitar.asiento}`).querySelector('img').src = this.asientoDisponible;
      this.servicioCompra.agregarBoleto(new Boleto(this.evento.id,'','',fila,asiento,50.0));
      event.currentTarget.querySelector('img').src = this.asientoSeleccionado;
    }
  }

  cancelarBoleto(boleto: Boleto) {
    this.servicioCompra.cancelarBoleto(boleto);  
  }

  aumentarDisponibles() {
    this.servicioCompra.aumentarDisponibles();
  }

  quitarDisponibles() {
    if (this.servicioCompra.boletosPorComprar > 0) {
      this.servicioCompra.reducirDisponibles();
      // Si son menos los que se van a comprar que los seleccionados, se descartan los necesarios
      for (let i = this.servicioCompra.boletosPorComprar; i < this.servicioCompra.asientosSeleccionados.length; i++) {
        let asientoPorQuitar = this.servicioCompra.quitarPrimero();
        document.querySelector(`#fila${asientoPorQuitar.fila} #asiento${asientoPorQuitar.asiento}`).querySelector('img').src = this.asientoDisponible;
      }
    }
  }

  costoTotal(): number {
    return this.servicioCompra.costoTotal();
  }


  enviarAComprar(){
    if(this.servicioCompra.asientosSeleccionados.length == this.servicioCompra.boletosPorComprar)
      this.router.navigate(['comprar'],{relativeTo:this.route});
    else
      alert("Seleccione todos los asientos o reduzca su cantidad.");
  }

}
