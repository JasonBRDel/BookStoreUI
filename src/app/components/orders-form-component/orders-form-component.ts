import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../entities/order';
import { OrderService } from '../../core/services/orders-service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { OrdersListComponent } from './orders-list-component/orders-list-component';
import { LoadingComponent } from '../../shared/loading-component/loading-component';

@Component({
  selector: 'app-orders-form-component',
  imports: [OrdersListComponent, LoadingComponent],
  templateUrl: './orders-form-component.html',
  styleUrl: './orders-form-component.scss',
})
export class OrdersFormComponent implements OnInit, OnDestroy {
  orders: Order[] = []
  loading = true;
  errorMessage = '';
  private destroyed$ = new Subject<void>();

  orderService = inject(OrderService);

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


  ngOnInit(): void {
    this.getData();

  }

  getData() {
    this.orderService.getAllOrders()
      .pipe(
        switchMap(() => this.orderService.data$),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (data) => {
          this.orders = data;
          this.loading = false
          this.cdr.detectChanges()
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      })
  }

}
