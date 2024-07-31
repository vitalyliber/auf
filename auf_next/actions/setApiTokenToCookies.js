"use server";

import { cookies } from "next/headers";
import { tokenName } from "../constants";

export async function setApiTokenToCookies(token) {
  if (!token) return;

  await cookies().set({
    name: tokenName,
    value: token,
    maxAge: 31536000,
    httpOnly: true,
    path: "/",
  });
}
