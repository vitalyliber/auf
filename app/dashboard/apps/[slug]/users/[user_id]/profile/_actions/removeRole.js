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

  console.log(name, userId, currentUser);

  const user = await db.query.users.findFirst({
    where: and(eq(users.id, userId), eq(users.doorId, currentUser.appId)),
  });

  const roles = user.roles;
  delete roles[name];

  await db.update(users).set({ roles }).where(eq(users.id, user.id));

  const door = await db.query.doors.findFirst({
    where: eq(doors.id, user.doorId),
  });

  revalidatePath(`/dashboard/apps/${door.name}/users/${user.id}/profile`);
}
