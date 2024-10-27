import { fetchToken } from "@/auf_next";
import { NextResponse } from "next/server";

export async function GET(request) {
  const redirectUrl = await fetchToken(request);

  if (!redirectUrl)
    return NextResponse.json({ error: "The redirectUrl is empty" });

  return NextResponse.redirect(redirectUrl);
}
