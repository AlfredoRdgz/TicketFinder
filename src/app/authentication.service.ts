import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(private servicioUsuario:UsuariosService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    if(this.servicioUsuario.tokenSesion){
      return true;
    }
    return false;
  }
}
