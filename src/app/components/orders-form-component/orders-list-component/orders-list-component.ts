import { Component, inject, Input } from '@angular/core';
import { Order } from '../../../entities/order';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/orders-service';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'orders-list-component',
  imports: [CommonModule],
  templateUrl: './orders-list-component.html',
  styleUrl: './orders-list-component.scss',
})
export class OrdersListComponent {

  @Input() data: Order[] = [];

  orderService = inject(OrderService);

  deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId)
      .pipe(
        switchMap(() => this.orderService.getAllOrders()),
        take(1))
      .subscribe();
  }



}
