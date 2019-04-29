import { Injectable } from '@angular/core';
import { Usuario } from './Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private lastId = 1;

  listaUsuarios: Usuario[] = [
    new Usuario(this.lastId++, 'test@admin.com', '12345', true),
    new Usuario(this.lastId++, 'maria@hotmail.com', 'asdfasdf', false)
  ];

  constructor() { }

  // no crea administradores
  agregarUsuario(correo: string, password: string) {
    const usuario = new Usuario(this.lastId++, correo, password, false);
    this.listaUsuarios.push(usuario);
    console.log(usuario);
  }

  agregarDeFormulario(formulario: any) {
    const correo = formulario.value.correo;
    const password = formulario.value.password;

    this.agregarUsuario(correo, password);
  }

  obtenerUsuarios(): Usuario[] {
    return this.listaUsuarios;
  }

  detallesUsuario(id: number): Usuario {
    return this.listaUsuarios[id];
    // comprobación de si sirve
  }
}
