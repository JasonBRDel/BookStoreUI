import { Book } from "./book";

export interface BookData extends Book {
    loading: boolean;
}