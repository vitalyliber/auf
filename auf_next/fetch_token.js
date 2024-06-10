import getUserJWTByTmpToken from "@/actions";
import { setJwtTokenToCookies, temporaryTokenName } from "@/auf_next";
import { NextResponse } from "next/server";

export async function fetchToken(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get(temporaryTokenName);
  const JWT = await getUserJWTByTmpToken(token);

  await setJwtTokenToCookies(JWT);

  const redirectUrl = searchParams.get("redirect_url");
  if (redirectUrl) {
    return NextResponse.redirect(redirectUrl);
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
