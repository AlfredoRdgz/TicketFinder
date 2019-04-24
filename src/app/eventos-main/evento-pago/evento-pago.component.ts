import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../Evento';
import { Boleto } from '../Boleto';
import { EventoServiceService } from '../evento-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioCompraService } from '../servicio-compra.service';

@Component({
  selector: 'app-evento-pago',
  templateUrl: './evento-pago.component.html',
  styleUrls: ['./evento-pago.component.css']
})
export class EventoPagoComponent implements OnInit {

  @Input() arregloBoletos:Boleto[];
  @Input() evento:Evento;
  formulario: FormGroup;

  constructor(private servicioCompra:ServicioCompraService,private servicioEvento: EventoServiceService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(!this.evento){
      this.evento = this.servicioEvento.detalleEvento(Number(this.router.url.split('/')[2]));
    }
    console.log(this.evento.descripcion);
      this.formulario = new FormGroup({
        opcion:new FormControl(''),
        nombre:new FormControl('',[
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z]+$')
        ]),
        numero: new FormControl('',[Validators.required]),
        codigo: new FormControl('',[Validators.required]),
        fecha: new FormControl('',[Validators.required]),
        correo: new FormControl('',[Validators.required,Validators.email])
      });
    }
    submit() {
      console.log(this.formulario.value);
      this.servicioCompra.confirmarCompra(this.formulario.value);
      this.formulario.reset();
      this.router.navigate(['confirmacion']);
    }
}
