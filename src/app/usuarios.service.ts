import { Injectable } from '@angular/core';
import { Usuario } from './Usuario';
import { Subject } from 'rxjs';
import { Boleto } from './eventos-main/Boleto';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private lastId = 1;
  sesionActual: Usuario;
  misBoletos: Boleto[];
  administrador = new Subject<any>();
  tokenSesion: string;
  correoSesion: string;


  constructor(private http: HttpClient) { }

  // no crea administradores
  agregarUsuario(usuario: string, correo: string, contraseña: string) {
    const cuenta = new Usuario(this.lastId++, usuario, correo, contraseña, '', false);
    // Haciendo un post para registrar al usuario
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.post('https://ticketfinder-rest.herokuapp.com/api/usuario',cuenta,{headers:headers,observe:'response'}).subscribe(
      (res:HttpResponse<any>) =>{
        this.tokenSesion = res.headers.get('x-auth');
        this.correoSesion = res.headers.get('x-user');
        this.administrador.next(res.body);
      }
    );  
  }

  agregarDeFormulario(formulario: any) {
    const correo = formulario.correo;
    const contraseña = formulario.contrasena;
    const usuario = formulario.usuario;
    this.agregarUsuario(usuario, correo, contraseña);
  }

  obtenerUsuarios(): Usuario[] {
    let listaUsuarios = [];
    // Obteniendo usuarios
    this.http.get('https://ticketfinder-rest.herokuapp.com/api/usuario').subscribe((data: Usuario[]) => {
      for (let i = 0; i < data.length; i++) {
        let nuevoUsuario = new Usuario(data[i].id, data[i].usuario, data[i].correo, data[i].contrasena, data[i].token, data[i].esAdmin);
        // Agregando usuarios a la lista
        listaUsuarios.push(nuevoUsuario);
      }
    });
    return listaUsuarios;
  }

  detallesUsuario(correo: string): Usuario {
    let usuario;
    // Obteniendo usuarios
    this.http.get('https://ticketfinder-rest.herokuapp.com/api/usuario/?correo='+correo).subscribe((data: Usuario) => {
        usuario = data;
    });
    return usuario;
  }

  iniciarSesion(formulario: any) {
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    let request = this.http.post('https://ticketfinder-rest.herokuapp.com/api/usuario/login',{correo:formulario.usuario,contrasena:formulario.contrasena},{headers:headers,observe:'response'});
    request.subscribe(
      (res:HttpResponse<any>) =>{
        if(res.status == 200){
          this.tokenSesion = res.headers.get('x-auth');
          this.correoSesion = res.headers.get('x-user');
          this.administrador.next(res.body);
        }else{
           alert('La cuenta ingresada tiene errores. Pruebe nuevamente');
        }
      }
    );
    return request;
  }

  tokenValido(){
    let headers = new HttpHeaders({'Content-Type':'application/json','x-auth':this.tokenSesion,'x-user':this.correoSesion});
    let request = this.http.get('https://ticketfinder-rest.herokuapp.com/api/usuario/validar',{headers:headers});
    request.subscribe((res:HttpResponse<any>) => {
      if (res['acceso']) { 
        console.log("Body "+JSON.stringify(res));
      } else {
        this.cerrarSesion();
      }
    });
    return request;
  }

  cerrarSesion() {
    let headers = new HttpHeaders({'Content-Type':'application/json','x-auth':this.tokenSesion,'x-user':this.correoSesion});
    console.log(JSON.stringify(headers));
    this.http.post('https://ticketfinder-rest.herokuapp.com/api/usuario/logout',{},{headers:headers,observe:'response' as 'body',responseType:'json'}).subscribe(
      (res:HttpResponse<any>) =>{
        if(res.status == 200){
          this.tokenSesion = null;
          this.correoSesion = null;
          this.administrador.next(null);
        }
      }
    );
  }
}
