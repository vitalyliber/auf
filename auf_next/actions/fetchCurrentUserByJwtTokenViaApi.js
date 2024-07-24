"use server";

import { cookies } from "next/headers";
import { appUrl, tokenName } from "../constants";

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
