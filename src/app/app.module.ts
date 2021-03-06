import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import{HttpClientModule}from'@angular/common/http';

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
import { EventoConfirmacionComponent } from './eventos-main/evento-confirmacion/evento-confirmacion.component';
import { EventosAdminComponent } from './eventos-main/eventos-admin/eventos-admin.component';
import { RegistroComponent } from './registro/registro.component';
import { EventosUsuarioComponent } from './eventos-main/eventos-usuario/eventos-usuario.component';

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
    EventoPagoComponent,
    EventoConfirmacionComponent,
    EventosAdminComponent,
    RegistroComponent,
    EventosUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
