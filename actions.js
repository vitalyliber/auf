"use server";

import { eq } from "drizzle-orm";
import { doors, users } from "@/db/schema.mjs";
import { db } from "@/db/db.mjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createJWT, verifyJWT } from "@/utils/jwt";
import isDev from "@/utils/isDev";

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

export async function sendAuthCodeAction(email) {
  // ten minutes
  const cookiesStore = cookies();
  const code = Math.floor(1000 + Math.random() * 9000);
  const status = isDev() ? true : "await sendCodeMailer(code, email)";
  if (status) {
    const result = await getOrCreateUser(email);
    // @TODO Handle the negative result of operation
    const auth = await createJWT({ code, email });
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

export default async function getUserJWTByEmail(email) {
  try {
    const user = await getOrCreateUser(email);
    if (user) {
      const payload = {
        id: user.id,
        email: user.email,
      };
      if (!user.confirmed) {
        await db
          .update(users)
          .set({ confirmed: true })
          .where(eq(users.email, user.email));
      }

      return await createJWT(payload);
    }
  } catch (e) {
    console.log("error", e.response.data);
  }
}

export async function confirmationAction(code, email) {
  const cookiesStore = cookies();
  const auth = cookiesStore.get("auth")?.value;
  const { code: savedCode, email: savedEmail } = await verifyJWT(auth);
  if (savedCode === parseInt(code) && savedEmail === email) {
    // @TODO save the client secrets (app name) to the device record
    // Call this code after the redirect
    // const JWT = await getUserJWTByEmail(email);
    // cookiesStore.set("token", JWT, { maxAge: 31536000 });
    cookiesStore.set("auth_token", "test", { maxAge: 31536000 });
    return { status: "success", title: "You've successfully authenticated" };
  } else {
    return { status: "error", title: "Incorrect verification code" };
  }
}
