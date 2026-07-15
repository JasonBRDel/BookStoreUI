import { Component, inject, Input } from '@angular/core';
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

  createOrder(book: Book) {

    const request: CreateOrderRequest = {
      bookId: book.id, inventory: book.inventory
    }

    this.orderService.createOrder(request).pipe(take(1))
      .subscribe()
  }

}
