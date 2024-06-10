"use server";

import { z } from "zod";

import { db } from "@/db/db.mjs";
import { eq } from "drizzle-orm";
import { doors } from "@/db/schema.mjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchCurrentUser } from "@/auf_next";

export async function createApp(_, formData) {
  const name = formData.get("name");
  const domain = formData.get("domain");

  const door = await db.query.doors.findFirst({
    where: eq(doors.name, name),
  });

  if (door) {
    return {
      message: `The door with the "${name}" is already exists`,
    };
  }

  const urlRegex = /^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

  const urlSchema = z.string().refine((url) => urlRegex.test(url), {
    message: "Invalid domain URL format",
  });
  const parsed = urlSchema.safeParse(domain);
  if (!parsed.success) {
    return { message: parsed.error.errors[0].message };
  }

  const latinLowercaseRegex = /^[a-z]+$/;

  const latinLowercaseSchema = z.string().regex(latinLowercaseRegex, {
    message:
      "Should contain only lowercase Latin characters without special symbols",
  });

  const latinLowercaseSchemaParsed = latinLowercaseSchema.safeParse(name);
  if (!latinLowercaseSchemaParsed.success) {
    return { message: latinLowercaseSchemaParsed.error.errors[0].message };
  }

  try {
    const currentUser = await fetchCurrentUser();
    await db.insert(doors).values({ name, domain, userId: currentUser.id });
    revalidatePath("/dashboard");
  } catch (e) {
    return { message: "Something went wrong. Please try again later" };
  }
  redirect("/dashboard");
}
