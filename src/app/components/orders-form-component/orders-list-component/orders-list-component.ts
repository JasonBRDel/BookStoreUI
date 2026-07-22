import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { Order } from '../../../entities/order';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/orders-service';
import { switchMap, take, timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'orders-list-component',
  imports: [CommonModule],
  templateUrl: './orders-list-component.html',
  styleUrl: './orders-list-component.scss',
})
export class OrdersListComponent {
  @Input() data: Order[] = [];

  loading = false;

  orderService = inject(OrderService);
  toastr = inject(ToastrService);

  constructor(private cdr: ChangeDetectorRef) { }



  deleteOrder(orderId: number) {
    this.loading = true;
    this.orderService.deleteOrder(orderId)
      .pipe(
        switchMap(() => this.orderService.getAllOrders()),
        take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.cdr.detectChanges();
          this.showSuccess('deleted');
        },
        error: () => this.showError('delete')
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
          this.cdr.detectChanges();
          this.showSuccess('completed');
        },
        error: () => this.showError('complete')
      })
  }


  showSuccess(action: string) {
    this.toastr.success(`Order ${action} successfully!`, 'Success');
  }

  showError(action: string) {
    this.toastr.error(`Order ${action} failed!`, 'Error');
  }


}
