import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  constructor(private servicioUsuario:UsuariosService,private location: Location) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [
        Validators.required,
      ]),
      contrasena: new FormControl('', [Validators.required])
    });
  }

  iniciarSesion(){
    this.servicioUsuario.iniciarSesion(this.formulario.value);
    this.formulario.reset();
    if(this.servicioUsuario.sesionActual){
      this.location.back();
    }else{
      alert('La cuenta ingresada tiene errores. Pruebe nuevamente');
    }
  }

}
