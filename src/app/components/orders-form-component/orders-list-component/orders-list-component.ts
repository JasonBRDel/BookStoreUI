import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { Order } from '../../../entities/order';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/orders-service';
import { switchMap, take, timer } from 'rxjs';

@Component({
  selector: 'orders-list-component',
  imports: [CommonModule],
  templateUrl: './orders-list-component.html',
  styleUrl: './orders-list-component.scss',
})
export class OrdersListComponent {
  @Input() data: Order[] = [];

  loading = false;

  constructor(private cdr: ChangeDetectorRef) { }


  orderService = inject(OrderService);

  deleteOrder(orderId: number) {
    this.loading = true;
    this.orderService.deleteOrder(orderId)
      .pipe(
        switchMap(() => this.orderService.getAllOrders()),
        take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.cdr.detectChanges()
        }
      })
  }

  completeOrder(orderId: number) {
    this.loading = true;
    this.orderService.completeOrder(orderId)
      .pipe(
        switchMap(() => timer(1500)),
        switchMap(() => this.orderService.getAllOrders()),
        take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.cdr.detectChanges()
        }
      })
  }


}
