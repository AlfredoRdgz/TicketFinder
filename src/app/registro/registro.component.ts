import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario: FormGroup;
  code:String;
  constructor(private servicioUsuario:UsuariosService,private router:Router) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
      contrasena2: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
      captcha: new FormControl('',[Validators.required])
    });

    // Creating captcha
    let a = Math.ceil(Math.random() * 9) + '';
    let b = Math.ceil(Math.random() * 9) + '';
    let c = Math.ceil(Math.random() * 9) + '';
    let d = Math.ceil(Math.random() * 9) + '';
    let e = Math.ceil(Math.random() * 9) + '';

    this.code = a + "" + b + "" + c + "" + d + "" + e;
  }

  // Validate input against the generated number
  ValidCaptcha():boolean {
      let str1 = this.removeSpaces(document.getElementById('CaptchaDiv').innerHTML);
      let str2 = this.removeSpaces(this.formulario.value.captcha);
      if (str1 == str2) {
          return true;
      } else {
          return false;
      }
  }

  passwordsMatch():boolean{
    return this.formulario.value.contrasena === this.formulario.value.contrasena2;
  }

  // Remove the spaces from the entered and generated code
  removeSpaces(string:string) {
    return string.split(' ').join('');
  }

  registrar() {
      // mandar formulario a servicio
      this.servicioUsuario.agregarDeFormulario(this.formulario.value);
      this.formulario.reset();
      this.router.navigate(['home']);
    }
}
