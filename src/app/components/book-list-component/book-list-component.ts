import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Book } from '../../entities/book';
import { BookStoreService } from '../../core/services/book-store-service';
import { pipe, take } from 'rxjs';
import { LoadingComponent } from '../../shared/loading-component/loading-component';
import { BookListTableComponent } from './book-list-table/book-list-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list-component',
  imports: [LoadingComponent, BookListTableComponent, CommonModule],
  providers: [BookStoreService],
  templateUrl: './book-list-component.html',
  styleUrl: './book-list-component.scss',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  errorMessage = '';

  bookService = inject(BookStoreService);

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit(): void {

    this.getData();
  }

  getData() {
    this.loading = true;
    this.bookService.getAllBooks()
    .pipe(take(1))
    .subscribe({
      next: (data) => {        
        this.books = data;           
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
      complete: () =>  {
        this.loading = false
        this.cdr.detectChanges() 
      }
    });
  }

}
