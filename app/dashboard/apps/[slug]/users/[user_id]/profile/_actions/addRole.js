"use server";

import { db } from "@/db/db.mjs";
import { eq } from "drizzle-orm";
import { doors, users } from "@/db/schema.mjs";
import { fetchCurrentUser } from "@/auf_next";
import { revalidatePath } from "next/cache";

export default async function addRole(_, formData) {
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

  await db
    .update(users)
    .set({ roles: { ...user.roles, [name]: true } })
    .where(eq(users.id, user.id));

  revalidatePath(`/dashboard/apps/${door.name}/users/${user.id}/profile`);

  return { message: `The role "${name}" was successfully added` };
}
