import { Book } from "./book";

export interface CreateOrderRequest {
  bookId: number;
  quantity: number;
}

export interface Order {
  id: number,
  bookId: number,
  orderDate: Date,
  quantity: number,
  book: Book
}