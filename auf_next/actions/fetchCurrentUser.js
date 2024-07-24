"use server";

import { cookies } from "next/headers";
import { internalTokenName, tokenName } from "../constants";
import { verifyJWT } from "../jwt";

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
