import { DELETE, get, patch, post } from "./ApiClient";
import { BookPayload } from "../containers/books/books-save/CreateBook";
import { Book, BookWithStatus } from "../types/common";

export function getBooks() {
  return get<BookWithStatus[] | undefined>("/books");
}

export function searchBooks(title: string) {
  return get<Omit<Book, "id" | "pages">[]>(`/books/${title}`);
}

export function createBook(body: BookPayload) {
  return post<Book>("/books", body);
}

export function editBook(id: number, body: BookWithStatus) {
  return patch<BookWithStatus>(`/books/${id}`, body);
}

export function deleteBook(id: number) {
  return DELETE<BookWithStatus[]>(`/books/${id}`);
}
