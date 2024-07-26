"use server";

import { db } from "@/db/db.mjs";
import { and, eq } from "drizzle-orm";
import { doors, users } from "@/db/schema.mjs";
import { revalidatePath } from "next/cache";
import { fetchCurrentUser } from "@/auf_next";

export default async function removeRole(_, formData) {
  const name = formData.get("role")?.toLowerCase();
  const userId = formData.get("userId");
  const currentUser = await fetchCurrentUser();

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  const door = await db.query.doors.findFirst({
    where: eq(doors.id, user.doorId),
  });

  if (currentUser.id !== door.userId) {
    return { message: `You don't have access to the App with id "${name}"` };
  }

  const roles = user.roles;
  delete roles[name];

  await db.update(users).set({ roles }).where(eq(users.id, user.id));

  revalidatePath(`/dashboard/apps/${door.name}/users/${user.id}/profile`);
}
