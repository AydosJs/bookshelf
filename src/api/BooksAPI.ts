import { get } from "./ApiClient";
import { BookRequest } from "../containers/books/BooksContainer";

export type RequestsResponse = {
  requests: BookRequest[];
  success: boolean;
};

export function getBooksRequestList(data?: "") {
  return get("/books", data);
}
