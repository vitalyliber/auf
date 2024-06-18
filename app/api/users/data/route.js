import { tokenName, verifyJWT } from "@/auf_next";
import { db } from "@/db/db.mjs";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema.mjs";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get(tokenName);
  const jwtUser = await verifyJWT(token);
  const user = await db.query.users.findFirst({
    where: eq(users.id, jwtUser.id),
  });
  return Response.json(user);
}
