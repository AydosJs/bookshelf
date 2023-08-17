import { APIResponse, User } from "../types/common";
import { post } from "./ApiClient";

export async function register(data: Omit<User, "id">) {
  const res = await post<APIResponse<User>>("/signup", data);

  return res.data;
}
