import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MeseroOrdersService } from 'src/app/services/mesero-orders.service';
import { Orders } from 'src/app/Interface/ordenes';

@Component({
  selector: 'app-mesero-ordenes',
  templateUrl: './mesero-ordenes.component.html',
  styleUrls: ['./mesero-ordenes.component.css']
})
export class MeseroOrdenesComponent {

  orders: Orders[] = [];


  constructor(private meseroOrdersService: MeseroOrdersService, private router:Router) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.meseroOrdersService.getOrders().subscribe(data => {
      console.log(data);
      this.orders = data;
    });
  }

  goToMeseroPedidos() {
    this.router.navigate(['/mesero-pedidos']);
  }
}// end 
