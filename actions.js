"use server";

import { users } from "@/schema";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function addRecord() {
  await db.insert(users).values({ email: "Andrew" });
  revalidatePath("/");
}
