"use server";

import { db } from "@/db/db.mjs";
import { eq } from "drizzle-orm";
import { doors } from "@/db/schema.mjs";

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

  return "";
}
