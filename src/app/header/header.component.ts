import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
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
      console.log("Llega");
      console.log(this.buscador.value);
      this.buscador.reset();
    }
}
