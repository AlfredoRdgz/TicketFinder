import { Injectable } from '@angular/core';
import { Usuario } from './Usuario';
import { Subject } from 'rxjs';
import { Boleto } from './eventos-main/Boleto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private lastId = 1;
  sesionActual: Usuario;
  misBoletos: Boleto[];
  administrador = new Subject<Usuario>();

  listaUsuarios: Usuario[] = [
    new Usuario(this.lastId++, 'Admin', 'test@admin.com', '12345', true),
    new Usuario(this.lastId++, 'Maria', 'maria@hotmail.com', 'asdfasdf', false)
  ];

  constructor() { }

  // no crea administradores
  agregarUsuario(usuario: string, correo: string, contraseña: string) {
    const cuenta = new Usuario(this.lastId++, usuario, correo, contraseña, false);
    this.listaUsuarios.push(cuenta);
    this.sesionActual = cuenta;
    this.administrador.next(cuenta);
  }

  agregarDeFormulario(formulario: any) {
    const correo = formulario.correo;
    const contraseña = formulario.contrasena;
    const usuario = formulario.usuario;
    this.agregarUsuario(usuario, correo, contraseña);
  }

  obtenerUsuarios(): Usuario[] {
    return this.listaUsuarios;
  }

  detallesUsuario(id: number): Usuario {
    return this.listaUsuarios[id];
    // comprobación de si sirve
  }

  iniciarSesion(formulario:any){
    this.sesionActual = this.listaUsuarios.find(usuario=> usuario.correo === formulario.usuario && usuario.contrasena === formulario.contrasena);
    this.administrador.next(this.sesionActual);
  }

  cerrarSesion(){
    this.sesionActual = null;
    this.administrador.next(null);
  }
}
