import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosListaComponent } from './eventos-main/eventos-lista/eventos-lista.component';
import { EventosMainComponent } from './eventos-main/eventos-main.component';
import { EventoCompraComponent } from './eventos-main/evento-compra/evento-compra.component';
import { EventoPagoComponent } from './eventos-main/evento-pago/evento-pago.component';
import { EventoAsientosComponent } from './eventos-main/evento-asientos/evento-asientos.component';
import { EventoConfirmacionComponent } from './eventos-main/evento-confirmacion/evento-confirmacion.component';

const routes: Routes = [
  {path:'',component:EventosMainComponent},
  {path: 'home',component:EventosMainComponent},
  {path: 'eventos',component:EventosListaComponent},
  {path: 'eventos/:id', component: EventoCompraComponent,children:[
    {path: '',component:EventoAsientosComponent},
    {path: 'comprar',component:EventoPagoComponent},
  ]},
  {path: 'confirmacion',component:EventoConfirmacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
