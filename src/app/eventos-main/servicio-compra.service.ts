import { Injectable } from '@angular/core';
import { Boleto } from './Boleto';
import { Pago } from './Pago';
import { EventoServiceService } from './evento-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioCompraService{

  asientosSeleccionados = [];
  boletosPorComprar = 0;
  datosCompra:Pago;

  constructor(private servicioEvento:EventoServiceService) { }

  agregar

  aumentarDisponibles() {
    this.boletosPorComprar++;
  }

  reducirDisponibles() {
    this.boletosPorComprar--;
  }

  quitarPrimero():Boleto{
    return this.asientosSeleccionados.shift();
  }

  costoTotal(): number {
    let total = 0;
    for (let asiento of this.asientosSeleccionados){
      total += asiento.costo;
    }
    return total;
  }

  agregarBoleto(boleto:Boleto){
    this.asientosSeleccionados.push(boleto);
  }

  cancelarBoleto(boleto: Boleto) {
    let indice = this.asientosSeleccionados.findIndex((lugar => boleto.fila === lugar.fila && boleto.asiento === lugar.asiento));
    this.asientosSeleccionados.splice(indice, 1);
  }

  puedeApartar():boolean{
    return this.asientosSeleccionados.length < this.boletosPorComprar;
  }

  verBoleto(fila, asiento):Boleto{
    return this.asientosSeleccionados.find( (boleto => boleto.fila === fila && boleto.asiento === asiento));
  }

  confirmarCompra(formulario:any):void{
    this.datosCompra = new Pago(formulario.opcion,formulario.nombre,formulario.numero,formulario.codigo,formulario.fecha,formulario.correo,this.costoTotal());
  }

  detallesCompra():Pago{
    if(this.datosCompra){
      return this.datosCompra;
    }
    return null;
  }

}
