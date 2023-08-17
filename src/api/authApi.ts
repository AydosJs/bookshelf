import { post } from "./ApiClient";
export interface AuthPayload {
  name: string;
  email: string;
  key: string;
  secret: string;
}
export type TokenResponse = {
  key: string;
  secret: string;
};

export function register(data: AuthPayload) {
  return post<TokenResponse>("/signup", data);
}
