"use server";

import { cookies } from "next/headers";
import { internalTokenName, tokenName } from "@/auf_next";

export async function logoutAction() {
  const cookiesStore = cookies();
  cookiesStore.delete(tokenName);
  cookiesStore.delete(internalTokenName);
}
