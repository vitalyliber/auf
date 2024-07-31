"use server";

import { cookies } from "next/headers";
import { internalTokenName } from "../constants";

export async function setInternalTokenToCookies(token) {
  if (!token) return;

  await cookies().set({
    name: internalTokenName,
    value: token,
    maxAge: 31536000,
    httpOnly: true,
    path: "/",
  });
}
