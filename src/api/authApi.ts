import { User } from "../types/common";
import { post } from "./ApiClient";

export async function register(data: Omit<User, "id">) {
  const res = await post<User>("/signup", data);
  return res;
}
