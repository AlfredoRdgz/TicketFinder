import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosMainComponent } from './eventos-main/eventos-main.component';
import { HeaderComponent } from './header/header.component';
import { EventosListaComponent } from './eventos-main/eventos-lista/eventos-lista.component';
import { EventoBoletosComponent } from './eventos-main/evento-boletos/evento-boletos.component';
import { EventoDetalleComponent } from './eventos-main/evento-detalle/evento-detalle.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventoCompraComponent } from './eventos-main/evento-compra/evento-compra.component';
import { EventoAsientosComponent } from './eventos-main/evento-asientos/evento-asientos.component';
import { EventoPagoComponent } from './eventos-main/evento-pago/evento-pago.component';

@NgModule({
  declarations: [
    AppComponent,
    EventosMainComponent,
    HeaderComponent,
    EventosListaComponent,
    EventoBoletosComponent,
    EventoDetalleComponent,
    LoginComponent,
    HomeComponent,
    EventoCompraComponent,
    EventoAsientosComponent,
    EventoPagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
