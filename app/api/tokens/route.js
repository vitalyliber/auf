import getUserJWTByTmpToken from "@/actions";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const JWT = await getUserJWTByTmpToken(token);
  return Response.json({ token: JWT });
}
