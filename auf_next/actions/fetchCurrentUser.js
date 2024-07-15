"use server";

import { cookies } from "next/headers";
import { internalTokenName, tokenName, verifyJWT } from "@/auf_next";

export const fetchCurrentUser = async () => {
  const cookiesStore = cookies();

  const internalToken = cookiesStore.get(internalTokenName)?.value;
  const apiToken = cookiesStore.get(tokenName)?.value;
  const userData = await verifyJWT(internalToken);

  return {
    internalToken,
    apiToken,
    ...(userData || {}),
  };
};
