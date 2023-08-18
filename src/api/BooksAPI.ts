import { get, patch, post } from "./ApiClient";
import { BookPayload } from "../containers/books/books-edit/CreateBook";
import { APIResponse, Book, BookWithStatus } from "../types/common";

export function getBooks() {
  return get<BookWithStatus[]>("/books");
}

export function searchBooks(title: string) {
  return get<APIResponse<Omit<Book, "id" | "pages">[]>>(`/books/${title}`);
}

export function createBook(body: BookPayload) {
  return post<APIResponse<BookWithStatus>>("/books", body);
}

export function editBook(id: number, body: BookWithStatus) {
  return patch<BookWithStatus>(`/books/${id}`, body);
}
