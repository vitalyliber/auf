import * as jose from "jose";
const alg = "HS256";

export async function createJWT(payload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .sign(secret);
}

export async function verifyJWT(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}
