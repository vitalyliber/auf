"use server";

import { cookies } from "next/headers";
import { internalTokenName } from "@/auf_next";

export async function setInternalTokenToCookies(token) {
  if (!token) return;
  const cookiesStore = cookies();

  await cookiesStore.set(internalTokenName, token, { maxAge: 31536000 });
}
