import { fetchToken } from "@/auf_next";

export async function GET(request) {
  return fetchToken(request)
}
