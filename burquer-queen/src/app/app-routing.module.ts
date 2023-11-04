import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login/login.component';
import { MeseroPedidosComponent } from './mesero-component/mesero-pedidos/mesero-pedidos.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'mesero-pedidos', component:MeseroPedidosComponent},
  { path: '**', redirectTo: '',pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
