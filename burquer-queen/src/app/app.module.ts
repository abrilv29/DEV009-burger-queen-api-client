import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-component/login/login.component';
import { MeseroPedidosComponent } from './mesero-component/mesero-pedidos/mesero-pedidos.component';
import { MeseroOrdenesComponent } from './mesero-component/mesero-ordenes/mesero-ordenes.component';
import { AgregarUsuariosComponent } from './admin-component/agregar-usuarios/agregar-usuarios.component';
import { AgregarProductosComponent } from './admin-component/agregar-productos/agregar-productos.component';
import { PedidosPendientesComponent } from './chef-component/pedidos-pendientes/pedidos-pendientes.component';
import { PedidosEntregadosComponent } from './chef-component/pedidos-entregados/pedidos-entregados.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeseroPedidosComponent,
    MeseroOrdenesComponent,
    AgregarUsuariosComponent,
    AgregarProductosComponent,
    PedidosPendientesComponent,
    PedidosEntregadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
