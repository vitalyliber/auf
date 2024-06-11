import {
  appUrl,
  createJWT,
  fetchApiCurrentUser,
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

    if (response.status === 200) {
      const respJSON = await response.json();

      if (respJSON?.token) {
        await setApiTokenToCookies(respJSON?.token);
        // Fetch current user from the Auf server here (don't use fetch current user method)
        const currentUser = await fetchApiCurrentUser();
        console.log("currentUser", currentUser);
        // Encrypt user data using internal key
        const internalToken = await createJWT(currentUser);
        await setInternalTokenToCookies(internalToken);

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
