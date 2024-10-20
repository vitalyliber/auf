"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";
import { and, count, eq } from "drizzle-orm";
import { devices, doors, users } from "@/db/schema.mjs";
import { db } from "@/db/db.mjs";
import { cookies } from "next/headers";
import { createJWT, verifyJWT } from "@/auf_next";
import isDev from "@/utils/isDev";
import createUserJwtObject from "@/auf_next/createUserJwtObject";
import { adminAppName } from "@/auf_next";
import nodemailer from "nodemailer";

export async function getOrCreateUser(email, doorName = adminAppName) {
  const door = await db.query.doors.findFirst({
    where: eq(doors.name, doorName),
  });
  const user = await db.query.users.findFirst({
    where: and(eq(users.email, email), eq(users.doorId, door.id)),
  });

  let userData;
  if (!user) {
    userData = await db.insert(users).values({ email: email, doorId: door.id, createdAt: new Date(), onlineAt: new Date() });
  } else {
    userData = user;
  }
  await updateDoorsUsersCounter(door.id);
  return userData;
}

export async function sendAuthCodeAction(email, appName) {
  // ten minutes
  const code = Math.floor(1000 + Math.random() * 9000);
  const result = await getOrCreateUser(email, appName);
  // @TODO Handle the negative result of operation
  const auth = await createJWT({ code, email, appName });
  cookies().set({
    name: "auth",
    value: auth,
    maxAge: 10 * 60,
    httpOnly: true,
    path: "/",
  });

  let title = "The confirmation code has been sent to your email";
  if (isDev()) {
    title = `Dev authorization code: ${code}`;
  } else {
    const senderEmail = process.env.MAILER_USER;
    const text = `Hello ${email},\n\nYour authentication code:\n${code}`;
    let transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: 587,
      secure: false, // true для SSL
      auth: {
        user: senderEmail,
        pass: process.env.MAILER_PASS,
      },
    });

    let mailOptions = {
      from: `Auf <${senderEmail}>`,
      to: email,
      subject: "Your authentication code",
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email отправлен: " + info.response);
      }
    });
  }
  return {
    status: "success",
    title,
  };
}

export async function confirmationAction(code, email, appName) {
  const auth = cookies().get("auth")?.value;
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
      .values({ userId: user.id, token: tmpToken, userAgent: reqUserAgent, createdAt: new Date(), onlineAt: new Date() });

    await updateUsersDevicesCounter(user.id);
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
        const payload = createUserJwtObject({
          id: user.id,
          email: user.email,
          deviceId: device.id,
          appId: user.doorId,
          roles: user.roles,
        });

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

export async function updateUsersDevicesCounter(userId) {
  const devicesCount = await db
    .select({ count: count() })
    .from(devices)
    .where(eq(devices.userId, userId));

  await db
    .update(users)
    .set({ devicesCount: devicesCount?.[0]?.count || 0 })
    .where(eq(users.id, userId));
}

export async function updateDoorsUsersCounter(doorId) {
  const usersCount = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.doorId, doorId));

  await db
    .update(doors)
    .set({ usersCount: usersCount?.[0]?.count || 0 })
    .where(eq(doors.id, doorId));
}
