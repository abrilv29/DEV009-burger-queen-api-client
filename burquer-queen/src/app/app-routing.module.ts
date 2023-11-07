import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login/login.component';
import { MeseroPedidosComponent } from './mesero-component/mesero-pedidos/mesero-pedidos.component';
import { PedidosEntregadosComponent } from './chef-component/pedidos-entregados/pedidos-entregados.component';
import { AgregarUsuariosComponent } from './admin-component/agregar-usuarios/agregar-usuarios.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'mesero-pedidos', component:MeseroPedidosComponent },
  { path: 'chef-entregados', component: PedidosEntregadosComponent },
  { path: 'admin-users', component: AgregarUsuariosComponent },

  { path: '**', redirectTo: 'login',pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
