import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoServiceService } from '../eventos-main/evento-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private servicioEventos:EventoServiceService,private router:Router) { }
  listaEventos = true;
  buscador:FormGroup;

  ngOnInit() {

      this.buscador = new FormGroup({
        busqueda:new FormControl('',[
          Validators.required,
          Validators.minLength(3)
        ])
      });
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
}
