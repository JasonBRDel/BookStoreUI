import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { Book } from '../../../entities/book';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/orders-service';
import { take } from 'rxjs';
import { CreateOrderRequest } from '../../../entities/order';

@Component({
  selector: 'book-list-table',
  imports: [CommonModule],
  templateUrl: './book-list-table.html',
  styleUrl: './book-list-table.scss',
})
export class BookListTableComponent {
  @Input() data: Book[] = [];
  orderService = inject(OrderService);
  loading = false;

  constructor(private cdr: ChangeDetectorRef) { }

  createOrder(book: Book) {
    this.loading = true;
    const request: CreateOrderRequest = {
      bookId: book.id, quantity: 1
    }

    this.orderService.createOrder(request).pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.cdr.detectChanges()
        }
      })
  }

}
