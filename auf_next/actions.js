"use server";
import { cookies } from "next/headers";
import { appUrl, internalTokenName, tokenName } from "./constants";
import { verifyJWT } from "@/auf_next/jwt";

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

export async function fetchCurrentUser() {
  const cookiesStore = cookies();

  const internalToken = cookiesStore.get(internalTokenName)?.value;
  const apiToken = cookiesStore.get(tokenName)?.value;
  return {
    internalToken,
    apiToken,
    ...((await verifyJWT(internalToken)) || {}),
  };
}

export async function fetchApiCurrentUser() {
  const cookiesStore = cookies();
  const token = cookiesStore.get(tokenName)?.value;
  let user = null;

  const response = await fetch(`${appUrl}/api/users?${tokenName}=${token}`, {
    method: "GET",
  });

  if (response.status === 200) {
    user = await response.json();
  }

  return user;
}

export async function updateOnlineAt() {
  const cookiesStore = cookies();
  const token = cookiesStore.get(tokenName)?.value;

  // TODO set update interval here

  await fetch(`${appUrl}/api/users/online_at?${tokenName}=${token}`, {
    method: "PATCH",
  });
}
