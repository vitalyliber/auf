import getUserJWTByTmpToken, { updateUsersDevicesCounter } from "@/actions";
import { verifyJWT } from "@/auf_next";
import { devices } from "@/db/schema.mjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/db.mjs";
import { temporaryTokenName, tokenName } from "@/auf_next";
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get(temporaryTokenName);
  const JWT = await getUserJWTByTmpToken(token);
  return NextResponse.json({ token: JWT });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get(tokenName);

  const { deviceId, id } = await verifyJWT(token);
  await db.delete(devices).where(eq(devices.id, deviceId));
  await updateUsersDevicesCounter(id);

  return NextResponse.json({ status: "success" });
}
