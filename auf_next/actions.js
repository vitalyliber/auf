"use server";
import { cookies } from "next/headers";
import { tokenName } from "./constants";
import { verifyJWT } from "@/auf_next/jwt";

export async function getAuthTokenAction() {
  // TODO get the internal and auf token here as objects (or separated strings)

  const cookiesStore = cookies();
  return cookiesStore.get(tokenName)?.value;
}

export async function logoutAction() {
  // TODO delete also the internal token name here

  const cookiesStore = cookies();
  cookiesStore.delete(tokenName);
}

export async function setJwtTokenToCookies(token) {
  if (!token) return
  const cookiesStore = cookies();
  // TODO add the internal token name here
  await cookiesStore.set(tokenName, token, { maxAge: 31536000 });
}

export async function fetchCurrentUser() {
  const cookiesStore = cookies();
  // TODO use the internal token name here
  const token = cookiesStore.get(tokenName)?.value;
  return verifyJWT(token);
}

export async function fetchTokens() {
  console.log("xxxxxxxxx");
  // add an ability to make redirect based on some params
  return "make some work here";
}
