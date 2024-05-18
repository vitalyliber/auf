"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAuthTokenAction,
  getJwtTokenFromCookies,
  logoutAction,
  setJwtTokenToCookies,
} from "@/app/(landing)/_components/auth_actions";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Auth_btn({
  SignInComponent,
  SignOutComponent,
  appName,
}) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const searchParams = useSearchParams();

  const getAuthToken = useCallback(async () => {
    const token = await getAuthTokenAction();
    setAuthenticated(!!token);
  }, []);

  const handleLogout = async () => {
    const jwtToken = await getJwtTokenFromCookies();
    await fetch(`/api/tokens?token=${jwtToken}`, { method: "DELETE" });
    await logoutAction();

    window.location.reload();
  };

  useEffect(() => {
    getAuthToken().catch();
  }, [getAuthToken]);

  const appUrl = useMemo(() => {
    return process.env.NODE_ENV === "development"
      ? `http://localhost:3000/${appName}`
      : `https://auf.casply.com/${appName}`;
  }, [appName]);

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
          window.location.href = pathname + "?" + params.toString();
        }
      }
    }
  }, [searchParams, pathname]);

  useEffect(() => {
    setPersistentToken();
  }, [searchParams, pathname]);

  return (
    <>
      {authenticated ? (
        <div onClick={handleLogout}>{SignOutComponent}</div>
      ) : (
        <Link href={appUrl}>{SignInComponent}</Link>
      )}
    </>
  );
}
