import {
  appUrl,
  setApiTokenToCookies,
  setInternalTokenToCookies,
  temporaryTokenName,
} from "@/auf_next";
import { NextResponse } from "next/server";

export async function fetchToken(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get(temporaryTokenName);

  if (token) {
    // The client website can't do any database requests
    const response = await fetch(
      `${appUrl}/api/tokens?${temporaryTokenName}=${token}`,
      {
        method: "POST",
      },
    );
    console.log("response.status", response.status);

    if (response.status === 200) {
      const respJSON = await response.json();
      console.log("respJSON", respJSON);

      if (respJSON?.token) {
        await setApiTokenToCookies(respJSON?.token);
        // TODO encrypt user data using internal key
        await setInternalTokenToCookies(respJSON?.token);

        console.log("respJSON?.token", respJSON?.token);

        const redirectUrl = searchParams.get("redirect_url");
        if (redirectUrl) {
          return NextResponse.redirect(redirectUrl);
        } else {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
    }
  }
}
