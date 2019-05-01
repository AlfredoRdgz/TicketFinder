import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../Evento';
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

  @Input() evento:Evento;
  formulario: FormGroup;

  constructor(private servicioCompra:ServicioCompraService,private servicioEvento: EventoServiceService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(!this.evento){
      this.evento = this.servicioEvento.detalleEvento(Number(this.router.url.split('/')[2]));
    }
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
      this.servicioCompra.confirmarCompra(this.formulario.value);
      for(let boleto of this.servicioCompra.asientosSeleccionados){
        this.servicioEvento.agregarBoleto(this.evento.id,boleto);
      }
      this.formulario.reset();
      this.router.navigate(['confirmacion']);
    }
}
