import { Component, OnInit, Input, Output } from '@angular/core';
import { EventoServiceService } from '../evento-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Boleto } from '../Boleto';
import { Evento } from '../Evento';
import { ServicioCompraService } from '../servicio-compra.service';
import { UsuariosService } from '../../usuarios.service';
import { HttpResponse } from '@angular/common/http';

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
  sesionIniciada: boolean = false;


  @Input() evento: Evento;
  filas: string[] = [];
  columnas: number[] = [];
  //@Output() asientosSeleccionados: Boleto[] = this.servicioCompra.asientosSeleccionados;


  constructor(private servicioCompra: ServicioCompraService, private servicioEvento: EventoServiceService, private router: Router, private route: ActivatedRoute, private servicioUsuarios: UsuariosService) { }


  ngOnInit() {
    if (!this.evento) {
      let id = Number(this.router.url.split('eventos/')[1]);
      this.evento = this.servicioEvento.detalleEvento(id);
    }
    for (let i = 0; i < this.evento.filas; i++) {
      this.filas.push(String.fromCharCode(65 + i));
    }
    for (let i = 1; i <= this.evento.asientosXFila; i++) {
      this.columnas.push(i);
    }

   this.servicioUsuarios.tokenValido().then((res) => {
      if (res) { 
        this.sesionIniciada = true; 
      } else {
        this.sesionIniciada = false;
      }
    }).catch((err)=>console.log(err));
  }

  asientoCorrespondiente(asiento: number, fila: string): string {
    if (this.evento.boletos.findIndex(boleto => boleto.fila == fila && boleto.asiento == asiento) != -1) {
      return this.asientoOcupado;
    }
    return this.asientoDisponible;
  }

  elegirBoleto(event, fila, asiento): void {
    let boleto = this.servicioCompra.verBoleto(fila, asiento);
    let boletoOcupado = this.evento.boletos.findIndex(boleto => boleto.fila === fila && boleto.asiento === asiento);
    if (!boleto && this.servicioCompra.puedeApartar() && boletoOcupado === -1) {
      // Si el boleto está disponible y no excede el máximo
      this.servicioCompra.agregarBoleto(new Boleto(this.evento.id, '', '', fila, asiento, 50.0));
      event.currentTarget.querySelector('img').src = this.asientoSeleccionado;
    } else if (boleto) {
      // Si el boleto ya fue seleccionado se cancela
      this.cancelarBoleto(boleto);
      event.currentTarget.querySelector('img').src = this.asientoDisponible;
    } else if (boletoOcupado === -1 && !this.servicioCompra.puedeApartar()) {
      // Si el boleto está disponible pero ya se excedió el máximo quita el primero y luego inserta el seleccionado
      let asientoPorQuitar = this.servicioCompra.quitarPrimero();
      document.querySelector(`#asiento${asientoPorQuitar.fila}${asientoPorQuitar.asiento}`).querySelector('img').src = this.asientoDisponible;
      this.servicioCompra.agregarBoleto(new Boleto(this.evento.id, '', '', fila, asiento, 50.0));
      event.currentTarget.querySelector('img').src = this.asientoSeleccionado;
    } else {
      alert('Seleccione un asiento disponible');
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
        document.querySelector(`#asiento${asientoPorQuitar.fila}${asientoPorQuitar.asiento}`).querySelector('img').src = this.asientoDisponible;
      }
    }
  }

  costoTotal(): number {
    return this.servicioCompra.costoTotal();
  }


  enviarAComprar() {
    if (this.servicioCompra.asientosSeleccionados.length == this.servicioCompra.boletosPorComprar && this.sesionIniciada == true) {
      console.log('Enviando a la ruta de compra...');
      this.router.navigate(['comprar'], { relativeTo: this.route });
    }
    else if (this.servicioCompra.asientosSeleccionados.length == this.servicioCompra.boletosPorComprar) {
      this.router.navigate(['login']);
    }
    else
      alert("Seleccione todos los asientos o reduzca su cantidad.");
  }

}
