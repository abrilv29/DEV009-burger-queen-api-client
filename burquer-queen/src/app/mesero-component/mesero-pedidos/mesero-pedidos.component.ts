import { Component, afterNextRender } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from 'src/app/Interface/producto';
import { MeseroServiceService } from 'src/app/services/mesero-service.service';
import { MeseroOrdersService } from 'src/app/services/mesero-orders.service';
import { Orders } from 'src/app/Interface/ordenes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesero-pedidos',
  templateUrl: './mesero-pedidos.component.html',
  styleUrls: ['./mesero-pedidos.component.css']
})
export class MeseroPedidosComponent {
  products: Product[] = [];
  selectedProduct: string | null = null;
  total: number = 0;
  cart: Product[] = [];
  selectedProductQuantity: { [productId: string]: number } = {};
  clienteNombre: string = '';
  numeroMesa: number | null = null;

  constructor(private meseroService: MeseroServiceService, private  meseroOrdersService: MeseroOrdersService ,private router: Router) { }

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
    } else {
      this.loadProduct(); // All products
    }
  }

  addProduct(product: Product) {
    const productId = product.id;

    if (this.cart.includes(product)) {
      this.selectedProductQuantity[productId]++;
    } else {
      this.cart.push(product);
      this.selectedProductQuantity[productId] = 1;
    }

    this.total += product.price;
  }

  removeFromCart(product: Product) {
    const productId = product.id;

    if (this.cart.includes(product)) {
      this.total -= product.price * this.selectedProductQuantity[productId];
      delete this.selectedProductQuantity[productId];
      this.cart = this.cart.filter(p => p.id !== productId);
    }
  }

  decreaseQuantity(product: Product) {
    const productId = product.id;

    if (this.cart.includes(product) && this.selectedProductQuantity[productId] > 1) {
      this.selectedProductQuantity[productId]--;
      this.total -= product.price;
    }
  }

  increaseQuantity(product: Product) {
    const productId = product.id;

    if (this.cart.includes(product)) {
      this.selectedProductQuantity[productId]++;
      this.total += product.price;
    }
  }

  //CREATE ORDERS 
  sendOrder() {
    if (this.clienteNombre && this.numeroMesa && this.cart.length > 0) {
      const order: Orders = {
        client: this.clienteNombre,
        tableNumber: this.numeroMesa,
        products: this.cart.map(product => ({ qty: this.selectedProductQuantity[product.id], product })),
        status: 'pending',
        dataEntry: new Date().toISOString(),
        id: 0,
        userId: 0
      };

      this.meseroOrdersService.postOrder(order).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Orden creada con éxito',
            showConfirmButton: false,
            timer: 1500, // La ventana se cerrará automáticamente después de 1.5 segundos
          });
          
          this.cart = [];
          this.total = 0;
          this.loadOrders();
          console.log('Orden creada con éxito:', response);

        },
        error: (error) => {
          console.error('Error al crear la orden:', error);
        }
      });
    } else {
      // Mostrar mensaje de alerta utilizando SweetAlert2
      Swal.fire({
        icon: 'warning',
        title: 'Campos Incompletos',
        text: 'Completa todos los campos antes de enviar la orden.',
      });
    }
  }
  loadOrders() {
    throw new Error('Method not implemented.');
  }


  cancelOrder() {
    // Mostrar cuadro de confirmación utilizando SweetAlert2
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro?',
      text: '¿Desea cancelar el pedido?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
    }).then((result) => {
      // Si el usuario hace clic en "Sí, cancelar"
      if (result.isConfirmed) {
        // Cancelar el pedido y reiniciar el carrito y el total
        this.cart = [];
        this.total = 0;

        // También puedes agregar más lógica aquí según tus necesidades

        Swal.fire('Pedido cancelado', '', 'success');
        // Limpiar campos de entrada
        this.clienteNombre = '';
        this.numeroMesa = null;
      }
    });
  }

  redirectToMeseroOrdenes() {
    this.router.navigate(['/mesero-ordenes']);
  }




}
