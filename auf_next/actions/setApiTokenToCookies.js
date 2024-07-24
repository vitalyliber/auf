"use server";

import { cookies } from "next/headers";
import { tokenName } from "../constants";

export async function setApiTokenToCookies(token) {
  if (!token) return;
  const cookiesStore = cookies();

  await cookiesStore.set(tokenName, token, { maxAge: 31536000 });
}
