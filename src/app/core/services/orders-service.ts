import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateOrderRequest } from "../../entities/order";

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private url = 'https:localhost:7045/api/orders';
  private http = inject(HttpClient);

  createOrder(order:CreateOrderRequest):Observable<boolean> {
    return this.http.post<boolean>(`${this.url}`, order)
  }
}