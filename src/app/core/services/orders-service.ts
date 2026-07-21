import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { CreateOrderRequest, Order } from "../../entities/order";
import { Response } from "../../entities/response";

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private url = 'https:localhost:7045/api/orders';
  private http = inject(HttpClient);

  private dataSource = new BehaviorSubject<Order[]>([]);
  data$ = this.dataSource.asObservable();

  createOrder(order: CreateOrderRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}`, order)
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Response<Order[]>>(`${this.url}`)
      .pipe(
        map(response => {
          if (response && response.success) {
            this.setData(response.data);
            return response.data;
          }

          throw new Error(response.message)
        })
      )
  }

  deleteOrder(orderId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${orderId}`)
  }

  setData(data: Order[]) {
    this.dataSource.next(data);
  }

}