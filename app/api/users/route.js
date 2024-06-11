import { tokenName, verifyJWT } from "@/auf_next";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get(tokenName);
  const user = await verifyJWT(token);
  return Response.json(user);
}
