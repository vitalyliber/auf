"use server";

import { cookies } from "next/headers";
import { appUrl, onlineAtCookieName, tokenName } from "./constants";
import { redirect } from "next/navigation";
import isEqual from "fast-deep-equal";
import createUserJwtObject from "./createUserJwtObject";
import { createJWT } from "./jwt";
import {
  fetchCurrentUser,
  logoutAction,
  setInternalTokenToCookies,
} from "./actions";

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
              appId: user.doorId,
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
