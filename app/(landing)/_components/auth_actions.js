"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { tokenName } from "@/app/(landing)/_components/constants";

export async function getAuthTokenAction() {
  const cookiesStore = cookies();
  return cookiesStore.get(tokenName)?.value;
}

export async function logoutAction() {
  const cookiesStore = cookies();
  cookiesStore.delete(tokenName);
  revalidatePath("/", "layout");
}

export async function setJwtTokenToCookies(token) {
  const cookiesStore = cookies();
  await cookiesStore.set(tokenName, token, { maxAge: 31536000 });
}
