import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../Evento';
import { EventoServiceService } from '../evento-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioCompraService } from '../servicio-compra.service';
import { UsuariosService } from 'src/app/usuarios.service';

@Component({
  selector: 'app-evento-pago',
  templateUrl: './evento-pago.component.html',
  styleUrls: ['./evento-pago.component.css']
})
export class EventoPagoComponent implements OnInit {

  @Input() evento:Evento;
  formulario: FormGroup;

  constructor(private servicioUsuario:UsuariosService,private servicioCompra:ServicioCompraService,private servicioEvento: EventoServiceService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(!this.evento){
      this.evento = this.servicioEvento.detalleEvento(Number(this.router.url.split('/')[2]));
    }
      this.formulario = new FormGroup({
        opcion:new FormControl('',[Validators.required]),
        nombre:new FormControl(this.servicioUsuario.usuarioSesion,[
          Validators.required,
          Validators.pattern('^[A-Za-z].+$')
        ]),
        numero: new FormControl('',[Validators.required]),
        codigo: new FormControl('',[Validators.required]),
        fecha: new FormControl('',[Validators.required]),
        correo: new FormControl(this.servicioUsuario.correoSesion,[Validators.required,Validators.email])
      });
    }

    submit() {
      this.servicioCompra.confirmarCompra(this.formulario.value);
      for(let boleto of this.servicioCompra.asientosSeleccionados){
        boleto.comprador = this.formulario.value.nombre;
        boleto.correo = this.formulario.value.correo;
        this.servicioEvento.agregarBoleto(this.evento.id,boleto);
      }
      this.formulario.reset();
      this.router.navigate(['confirmacion']);
    }
}
