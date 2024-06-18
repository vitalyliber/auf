"use server";
import { cookies } from "next/headers";
import { appUrl, internalTokenName, tokenName } from "./constants";
import { verifyJWT, onlineAtCookieName, createJWT } from "@/auf_next";
import { redirect } from "next/navigation";
import { isEqual } from "lodash";
import createUserJwtObject from "@/auf_next/createUserJwtObject";

export async function logoutAction() {
  const cookiesStore = cookies();
  cookiesStore.delete(tokenName);
  cookiesStore.delete(internalTokenName);
}

export async function setInternalTokenToCookies(token) {
  if (!token) return;
  const cookiesStore = cookies();

  await cookiesStore.set(internalTokenName, token, { maxAge: 31536000 });
}

export async function setApiTokenToCookies(token) {
  if (!token) return;
  const cookiesStore = cookies();

  await cookiesStore.set(tokenName, token, { maxAge: 31536000 });
}

export const fetchCurrentUser = async () => {
  const cookiesStore = cookies();

  const internalToken = cookiesStore.get(internalTokenName)?.value;
  const apiToken = cookiesStore.get(tokenName)?.value;
  const userData = await verifyJWT(internalToken);

  return {
    internalToken,
    apiToken,
    ...(userData || {}),
  };
};

export const fetchCurrentUserByJwtTokenViaApi = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get(tokenName)?.value;
  let user = null;

  const response = await fetch(
    `${appUrl}/api/users/parse_jwt?${tokenName}=${token}`,
    {
      method: "GET",
    },
  );

  if (response.status === 200) {
    user = await response.json();
  }

  return user;
};

export async function updateOnlineAt() {
  const cookiesStore = cookies();
  const token = cookiesStore.get(tokenName)?.value;

  // Cache it for 5 minutes
  const updated = cookiesStore.get(onlineAtCookieName);

  if (!updated) {
    cookiesStore.set(onlineAtCookieName, "protect_server_from_ddos", {
      maxAge: 5 * 60,
    });

    // Update an online status
    const onlineAtResponse = await fetch(
      `${appUrl}/api/users/online_at?${tokenName}=${token}`,
      {
        method: "PATCH",
      },
    );

    if (onlineAtResponse.status === 200) {
      const json = await onlineAtResponse.json();
      if (json.status === "logout") {
        await logoutAction();
        redirect("/");
      } else {
        // Update token if roles is changed
        const userDataResponse = await fetch(
          `${appUrl}/api/users/data?${tokenName}=${token}`,
          {
            method: "GET",
          },
        );

        if (userDataResponse.status === 200) {
          const user = await userDataResponse.json();
          const currenUser = await fetchCurrentUser();

          if (!isEqual(user, currenUser)) {
            const updatedUser = createUserJwtObject({
              id: user.id,
              email: user.email,
              deviceId: currenUser.deviceId,
              appId: user.appId,
              roles: user.roles,
            });
            const internalToken = await createJWT(updatedUser);
            await setInternalTokenToCookies(internalToken);
          }
        }
      }
    }
  }
}
