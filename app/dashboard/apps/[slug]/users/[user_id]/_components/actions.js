"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/db.mjs";
import { devices, doors, users } from "@/db/schema.mjs";
import { and, eq } from "drizzle-orm";
import { updateUsersDevicesCounter } from "@/actions";
import { fetchCurrentUser } from "@/auf_next";

export async function deleteDeviceAction(_, formData) {
  const userId = formData.get("user_id");
  const deviceId = formData.get("device_id");
  const appName = formData.get("app_name");

  const currentUser = await fetchCurrentUser();

  const door = await db.query.doors.findFirst({
    where: and(eq(doors.name, appName), eq(doors.userId, currentUser.id)),
  });
  const user = await db.query.users.findFirst({
    where: and(eq(users.id, userId), eq(users.doorId, door.id)),
  });
  await db
    .delete(devices)
    .where(and(eq(devices.id, deviceId), eq(devices.userId, user.id)));

  await updateUsersDevicesCounter(user.id);

  revalidatePath(`/dashboard/apps/${appName}/users/${userId}`);
  return null;
}
