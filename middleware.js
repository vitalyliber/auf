import { NextResponse } from "next/server";
import { fetchCurrentUser } from "@/auf_next";

export async function middleware(request) {
  const currentUser = await fetchCurrentUser({ brokenJwtRedirect: false });

  if (currentUser) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: "/",
};
