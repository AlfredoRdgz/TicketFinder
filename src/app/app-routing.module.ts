import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosListaComponent } from './eventos-main/eventos-lista/eventos-lista.component';
import { EventoCompraComponent } from './eventos-main/evento-compra/evento-compra.component';
import { EventoPagoComponent } from './eventos-main/evento-pago/evento-pago.component';
import { EventoAsientosComponent } from './eventos-main/evento-asientos/evento-asientos.component';
import { EventoConfirmacionComponent } from './eventos-main/evento-confirmacion/evento-confirmacion.component';
import { HomeComponent } from './home/home.component';
import { EventosAdminComponent } from './eventos-main/eventos-admin/eventos-admin.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthenticationService } from './authentication.service';
import { EventosUsuarioComponent } from './eventos-main/eventos-usuario/eventos-usuario.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'home',component:HomeComponent},
  {path: 'eventos',component:EventosListaComponent},
  {path: 'eventos/:id', component: EventoCompraComponent,children:[
    {path: '',component:EventoAsientosComponent},
    {path: 'comprar',component:EventoPagoComponent,canActivate:[AuthenticationService]},
  ]},
  {path: 'confirmacion',component:EventoConfirmacionComponent},
  {path:'admin',component:EventosAdminComponent,canActivate:[AuthenticationService]},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'misEventos',component:EventosUsuarioComponent,canActivate:[AuthenticationService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
