import { onlineAtCookieName, tokenName, verifyJWT } from "@/auf_next";
import { db } from "@/db/db.mjs";
import { devices, users } from "@/db/schema.mjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function PATCH(request) {
  const cookiesStore = cookies();
  // Cache it for 5 minutes
  const updated = cookiesStore.get(onlineAtCookieName);
  if (!updated) {
    cookiesStore.set(onlineAtCookieName, "protect_server_from_ddos", {
      maxAge: 5 * 60,
    });

    const { searchParams } = new URL(request.url);
    const token = searchParams.get(tokenName);
    const user = await verifyJWT(token);
    await db
      .update(users)
      .set({ onlineAt: new Date() })
      .where(eq(users.id, user.id));

    await db
      .update(devices)
      .set({ onlineAt: new Date() })
      .where(eq(devices.id, user.deviceId));
  }

  return Response.json({ status: "success" });
}
