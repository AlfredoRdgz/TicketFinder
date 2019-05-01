import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoServiceService } from '../eventos-main/evento-service.service';
import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../Usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sesionIniciada:boolean;
  administrador: boolean;
  suscripcionSesion: Subscription;
  usuarioActual:Usuario;
  constructor(private servicioEventos: EventoServiceService, private router: Router, private servicioUsuarios: UsuariosService) { }
  listaEventos = true;
  buscador: FormGroup;

  ngOnInit() {
    this.buscador = new FormGroup({
      busqueda: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
    this.suscripcionSesion = this.servicioUsuarios.administrador.subscribe(
      (usuario: Usuario) => { 
        if(usuario) {this.administrador = usuario.esAdmin; this.sesionIniciada = true;}
        else{ this.administrador = false; this.sesionIniciada = false;}
        this.usuarioActual = usuario;
      },
      (error: any) => { console.log(error); },
      () => { console.log('Completado '); }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.suscripcionSesion.unsubscribe();
  }

  buscar() {
    // Asignar una variable de búsqueda en el servicio
    this.servicioEventos.asignarBusqueda(this.buscador.value.busqueda);
    // Borro el valor del formulario
    this.buscador.reset();
    // Navegar al buscador de eventos
    this.router.navigate(['eventos']);
  }

  displayResponsive() {
    let x = document.getElementById("myTopnav");
    if (!x.classList.contains('responsive')) {
      x.classList.add('responsive');
    } else {
      x.classList.remove('responsive');
    }
  }

  cerrarSesion(){
    this.servicioUsuarios.cerrarSesion();
  }
}
