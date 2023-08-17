export enum BookStatus {
  NEW,
  READING,
  FINISHED,
}

export type APIResponse<T> = {
  data: T;
  isOk: boolean;
  message: string;
};

export type BookWithStatus = {
  book: Book;
  status: BookStatus;
};

export type Book = {
  id: number;
  isbn: string;
  title: string;
  cover: string;
  author: string;
  published: number;
  pages: number;
};

export type User = {
  id?: number;
  name: string;
  email: string;
  key: string;
  secret: string;
};
