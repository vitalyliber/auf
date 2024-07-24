import { fetchToken } from "@/auf_next";
import { NextResponse } from "next/server";

export async function GET(request) {
  const redirectUrl = await fetchToken(request)
  return NextResponse.redirect(redirectUrl);
}
