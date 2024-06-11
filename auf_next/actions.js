"use server";
import { cookies } from "next/headers";
import { appUrl, internalTokenName, tokenName } from "./constants";
import { verifyJWT, onlineAtCookieName } from "@/auf_next";
import { redirect } from "next/navigation";

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

  // Cache it for 5 minutes
  const updated = cookiesStore.get(onlineAtCookieName);

  if (!updated) {
    cookiesStore.set(onlineAtCookieName, "protect_server_from_ddos", {
      maxAge: 5 * 60,
    });

    const response = await fetch(
      `${appUrl}/api/users/online_at?${tokenName}=${token}`,
      {
        method: "PATCH",
      },
    );
    if (response.status === 200) {
      const json = await response.json();
      if (json.status === "logout") {
        await logoutAction();
        redirect("/");
      }
    }
  }
}
