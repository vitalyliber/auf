"use server";

import { users } from "@/db/schema.mjs";
import { db } from "@/db/db.mjs";
import { revalidatePath } from "next/cache";

export async function addRecord() {
  await db.insert(users).values({ email: "Andrew", doorId: 1 });
  revalidatePath("/");
}
