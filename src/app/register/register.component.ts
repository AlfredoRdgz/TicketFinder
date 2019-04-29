import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios-main/usuarios-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;

  // captcha
  public code = this.newCaptcha();
  public codeFlag = false;
  public passwordFlag = false;

/*  public captcha = '';
  public email = '';
  public password = '';
  public passRepeat = '';

  public emailFlag = true;
  public passwordRepFlag = true;
  
*/

  constructor(private router: Router,
              private servicioUsuario: UsuariosService) { }

  ngOnInit() {
    // this.code = this.newCaptcha();
    console.log(this.code);
    this.formulario = new FormGroup( {
      correo: new FormControl('', [Validators.required, Validators.email]), // valida correo solo
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      passRep: new FormControl('', [Validators.required, Validators.minLength(3)]),
      captcha: new FormControl('', Validators.required)
    });
  }

  newCaptcha() {
    const a = Math.ceil(Math.random() * 9) + '';
    const b = Math.ceil(Math.random() * 9) + '';
    const c = Math.ceil(Math.random() * 9) + '';
    const d = Math.ceil(Math.random() * 9) + '';
    const e = Math.ceil(Math.random() * 9) + '';
    return a + '' + b + '' + c + '' + d + '' + e;
  }

  ValidCaptcha() {
    const str1 = this.removeSpaces(this.code);
    const str2 = this.formulario.value.captcha;

    if (str1 === str2) {
      console.log('Captcha correcto');
      this.codeFlag = false;
      return true;
    } else {
      // error y cambiar captcha
      this.code = this.newCaptcha();
      return false;
    }
  }

  // Remove the spaces from the entered and generated code
  removeSpaces(str) {
    return str.split(' ').join('');
  }

  submit() {
    console.log(this.formulario.value);
    console.log(this.passwordFlag, this.codeFlag);

    if (!this.ValidCaptcha()) {
      console.log('Captcha incorrecto');
      this.codeFlag = true;
      this.formulario.reset();

    } else if (this.formulario.value.password !== this.formulario.value.passRepeat) {
      console.log('Contraseñas incorrectas');
      this.passwordFlag = true;
      this.formulario.reset();

    } else {  // datos correctos
      // reiniciar banderas
      this.codeFlag = false;
      this.passwordFlag = false;

      // mandar formulario a servicio
      this.servicioUsuario.agregarDeFormulario(this.formulario.value);
      this.router.navigate(['home']);

      console.log(this.servicioUsuario.listaUsuarios);
    }
  }


}

