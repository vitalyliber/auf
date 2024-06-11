import { tokenName, verifyJWT } from "@/auf_next";
import { db } from "@/db/db.mjs";
import { devices, users } from "@/db/schema.mjs";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get(tokenName);
  const user = await verifyJWT(token);

  if (!user?.id) return Response.json({ status: "success" });

  // Remove credentials if the device was removed
  const device = await db.query.devices.findFirst({
    where: eq(devices.id, user.deviceId),
  });

  await db
    .update(users)
    .set({ onlineAt: new Date() })
    .where(eq(users.id, user.id));

  if (device) {
    await db
      .update(devices)
      .set({ onlineAt: new Date() })
      .where(eq(devices.id, user.deviceId));

    return Response.json({ status: "success" });
  } else {
    return Response.json({ status: "logout" });
  }
}
