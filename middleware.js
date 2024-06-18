import { NextResponse } from "next/server";
import { fetchCurrentUser } from "@/auf_next";

export async function middleware(request) {
  const currentUser = await fetchCurrentUser();

  if (currentUser.id) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: "/",
};
