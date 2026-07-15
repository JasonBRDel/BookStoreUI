import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../../entities/book';
import { Response } from '../../entities/response';

@Injectable({
  providedIn: 'root' // Makes the service available app-wide
})

export class BookStoreService {
  private url = 'https:localhost:7076/api';

  private http = inject(HttpClient);


  getAllBooks(): Observable<Book[]> {
    return this.http.get<Response<Book[]>>(`${this.url}/book/all`).pipe(
      map(response => {
        if (response && response.success) {
          return response.data;
        }

        throw new Error(response.message)
      })
    )
  }

  // AddBook
  // RemoveBook/id
  // UpdateBook
}
