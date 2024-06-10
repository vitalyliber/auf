"use server";
import { cookies } from "next/headers";
import { tokenName } from "./constants";
import {verifyJWT} from "@/auf_next/jwt";

export async function getAuthTokenAction() {
  const cookiesStore = cookies();
  return cookiesStore.get(tokenName)?.value;
}

export async function logoutAction() {
  const cookiesStore = cookies();
  cookiesStore.delete(tokenName);
}

export async function setJwtTokenToCookies(token) {
  const cookiesStore = cookies();
  await cookiesStore.set(tokenName, token, { maxAge: 31536000 });
}

export async function fetchCurrentUser() {
  const cookiesStore = cookies();
  const token = cookiesStore.get(tokenName)?.value;
  return verifyJWT(token);
}
