"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";
import { eq } from "drizzle-orm";
import { devices, doors, users } from "@/db/schema.mjs";
import { db } from "@/db/db.mjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createJWT, verifyJWT } from "@/utils/jwt";
import isDev from "@/utils/isDev";
import { tokenName } from "@/app/(landing)/_components/constants";

export async function addRecord() {
  await db.insert(users).values({ email: "Andrew", doorId: 1 });
  revalidatePath("/");
}

export async function getOrCreateUser(email, doorName = "auf") {
  const door = await db.query.doors.findFirst({
    where: eq(doors.name, doorName),
  });
  const user = await db.query.users.findFirst({
    where: eq(users.email, email, users.doorId, door.id),
  });

  if (!user) {
    return db.insert(users).values({ email: email, doorId: door.id });
  } else {
    return user;
  }
}

async function updateUser(email, doorName, doorId) {}

export async function sendAuthCodeAction(email, appName) {
  // ten minutes
  const cookiesStore = cookies();
  const code = Math.floor(1000 + Math.random() * 9000);
  const status = isDev() ? true : "await sendCodeMailer(code, email)";
  if (status) {
    const result = await getOrCreateUser(email, appName);
    // @TODO Handle the negative result of operation
    const auth = await createJWT({ code, email, appName });
    cookiesStore.set("auth", auth, { maxAge: 10 * 60 });
    return {
      status: "success",
      title: isDev()
        ? `Dev authorization code: ${code}`
        : "A confirmation code has been sent to your email",
    };
  } else {
    return {
      status: "error",
      title: "Something went wrong. Please try again later",
    };
  }
}

export async function confirmationAction(code, email, appName) {
  const cookiesStore = cookies();
  const auth = cookiesStore.get("auth")?.value;
  const {
    code: savedCode,
    email: savedEmail,
    appName: savedAppName,
  } = await verifyJWT(auth);
  if (
    savedCode === parseInt(code) &&
    savedEmail === email &&
    appName === savedAppName
  ) {
    const uint32 = crypto.getRandomValues(new Uint32Array(1))[0];
    const tmpToken = uint32.toString(16);

    const reqUserAgent = userAgent({ headers: headers() });

    const user = await getOrCreateUser(email, appName);
    await db
      .update(users)
      .set({ confirmed: true })
      .where(eq(users.id, user.id));
    await db
      .insert(devices)
      .values({ userId: user.id, token: tmpToken, userAgent: reqUserAgent });

    return {
      status: "success",
      title: "You've successfully authenticated",
      tmpToken,
    };
  } else {
    return { status: "error", title: "Incorrect verification code" };
  }
}

export default async function getUserJWTByTmpToken(tmpToken) {
  try {
    const device = await db.query.devices.findFirst({
      where: eq(devices.token, tmpToken),
    });
    if (device) {
      const user = await db.query.users.findFirst({
        where: eq(users.id, device.userId),
      });
      if (user) {
        const payload = {
          id: user.id,
          email: user.email,
          deviceId: device.id,
        };

        const jwtToken = await createJWT(payload);

        await db
          .update(devices)
          .set({ token: `burned_${device.token}` })
          .where(eq(devices.id, device.id));

        return jwtToken;
      }
    }
  } catch (e) {
    console.log("error", e.response.data);
  }
}

export async function fetchCurrentUser() {
  const cookiesStore = cookies();
  const token = cookiesStore.get(tokenName)?.value;
  return verifyJWT(token);
}
