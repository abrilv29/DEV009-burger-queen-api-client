import { Component } from '@angular/core';
import { Product } from 'src/app/Interface/producto';
import { MeseroServiceService } from 'src/app/services/mesero-service.service';

@Component({
  selector: 'app-mesero-pedidos',
  templateUrl: './mesero-pedidos.component.html',
  styleUrls: ['./mesero-pedidos.component.css']
})
export class MeseroPedidosComponent {
  products: Product[] = []; //
  selectedProduct: string | null = null;

  constructor(public meseroService: MeseroServiceService) { }

  loadProduct() {
    this.meseroService.getProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }

  filterProducts() {
    if (this.selectedProduct) {
      this.meseroService.getProductsByType(this.selectedProduct).subscribe((data) => {
        console.log(data);
        this.products = data;
      });
    }
    else {
      this.loadProduct(); // All products
    }
  }

}