import getUserJWTByTmpToken from "@/actions";
import { verifyJWT } from "@/utils/jwt";
import { devices } from "@/db/schema.mjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/db.mjs";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const JWT = await getUserJWTByTmpToken(token);
  return Response.json({ token: JWT });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const { deviceId } = await verifyJWT(token);
  await db.delete(devices).where(eq(devices.id, deviceId));

  return Response.json({ status: "success" });
}
