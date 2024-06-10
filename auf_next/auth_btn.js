"use client";

import { useCallback, useEffect, useState } from "react";
import { appUrl } from "./constants";
import {
  getAuthTokenAction,
  logoutAction,
  setJwtTokenToCookies,
} from "./actions";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Auth_btn({
  SignInComponent,
  SignOutComponent,
  appName,
}) {
  const pathname = usePathname();
  const [jwtToken, setJwtToken] = useState(false);
  const searchParams = useSearchParams();

  const getAuthToken = useCallback(async () => {
    const token = await getAuthTokenAction();
    setJwtToken(token);
  }, []);

  const handleLogout = async () => {
    await fetch(`/api/tokens?token=${jwtToken}`, { method: "DELETE" });
    await logoutAction();

    window.location.href = "/";
  };

  useEffect(() => {
    getAuthToken().catch();
  }, [getAuthToken]);

  const setPersistentToken = useCallback(async () => {
    const tmpTokenName = "auf_token";
    const token = searchParams.get(tmpTokenName);
    if (token) {
      const response = await fetch(`/api/tokens?token=${token}`, {
        method: "POST",
      });
      if (response.status === 200) {
        const respJSON = await response.json();
        if (respJSON?.token) {
          await setJwtTokenToCookies(respJSON?.token);
          const params = new URLSearchParams(searchParams.toString());
          params.delete(tmpTokenName);
          if (appName === "auf") {
            window.location.href = "/dashboard" + "?" + params.toString();
          } else {
            window.location.href = pathname + "?" + params.toString();
          }
        }
      }
    }
  }, [searchParams, pathname, appName]);

  useEffect(() => {
    setPersistentToken();
  }, [searchParams, pathname, setPersistentToken]);

  return (
    <>
      {jwtToken ? (
        <div onClick={handleLogout}>{SignOutComponent}</div>
      ) : (
        <Link href={`${appUrl}/${appName}`}>{SignInComponent}</Link>
      )}
    </>
  );
}
