import getUserJWTByTmpToken, { updateUsersDevicesCounter } from "@/actions";
import { verifyJWT } from "@/auf_next/jwt";
import { devices } from "@/db/schema.mjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/db.mjs";
import { tokenName } from "@/auf_next";

export const dynamic = "force-dynamic";

// TODO future support for the non-nextjs applications
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get(tokenName);
  const JWT = await getUserJWTByTmpToken(token);
  return Response.json({ token: JWT });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get(tokenName);

  const { deviceId, id } = await verifyJWT(token);
  await db.delete(devices).where(eq(devices.id, deviceId));
  await updateUsersDevicesCounter(id);

  return Response.json({ status: "success" });
}
