import { get, post } from "./ApiClient";
import { BookRequest } from "../containers/books/BooksContainer";
import { BookPayload } from "../containers/books/books-edit/CreateBook";
import { APIResponse, Book, BookWithStatus } from "../types/common";

export type RequestsResponse = {
  requests: BookRequest[];
  success: boolean;
};

export function getBooks() {
  return get<APIResponse<BookWithStatus[]>>("/books");
}

export function searchBooks(title: string) {
  return get<APIResponse<Omit<Book, "id" | "pages">[]>>(`/books/${title}`);
}

export function createBook(body: BookPayload) {
  return post<APIResponse<BookWithStatus>>("/books", body);
}
