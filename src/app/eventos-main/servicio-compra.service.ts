import { Injectable } from '@angular/core';
import { Boleto } from './Boleto';
import { Pago } from './Pago';
import { EventoServiceService } from './evento-service.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UsuariosService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioCompraService{

  asientosSeleccionados = [];
  boletosPorComprar = 0;
  datosCompra:Pago;

  constructor(private servicioEvento:EventoServiceService,private http:HttpClient,private servicioUsuario:UsuariosService) { }

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
    //Preparando headers para post
    let headers = new HttpHeaders({'Content-Type':'application/json','x-auth':this.servicioUsuario.tokenSesion,'x-user':this.servicioUsuario.correoSesion});
    this.http.post('https://ticketfinder-rest.herokuapp.com/api/pago',this.datosCompra,{headers}).subscribe((res:HttpResponse<any>)=>{
      if(res.status != 201){
        console.log('Error en el alta del pago');
      }else{
        console.log('Pago agregado');
      }
  });
  }

  detallesCompra():Pago{
    if(this.datosCompra){
      return this.datosCompra;
    }
    return null;
  }

}
