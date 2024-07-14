"use server";
import { cookies } from "next/headers";
import { appUrl, internalTokenName, tokenName } from "./constants";
import { verifyJWT } from "@/auf_next";

export async function logoutAction() {
  const cookiesStore = cookies();
  cookiesStore.delete(tokenName);
  cookiesStore.delete(internalTokenName);
}

export async function setInternalTokenToCookies(token) {
  if (!token) return;
  const cookiesStore = cookies();

  await cookiesStore.set(internalTokenName, token, { maxAge: 31536000 });
}

export async function setApiTokenToCookies(token) {
  if (!token) return;
  const cookiesStore = cookies();

  await cookiesStore.set(tokenName, token, { maxAge: 31536000 });
}

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

export const fetchCurrentUserByJwtTokenViaApi = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get(tokenName)?.value;
  let user = null;

  const response = await fetch(
    `${appUrl}/api/users/parse_jwt?${tokenName}=${token}`,
    {
      method: "GET",
    },
  );

  if (response.status === 200) {
    user = await response.json();
  }

  return user;
};
