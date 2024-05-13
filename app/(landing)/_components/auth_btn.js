"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAuthTokenAction,
  logoutAction,
} from "@/app/(landing)/_components/auth_actions";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import getUserJWTByTmpToken from "@/actions";

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
      // @TODO make a http request to get the JWT instead of calling the the server action
      await getUserJWTByTmpToken(token);
      const params = new URLSearchParams(searchParams.toString());
      params.delete(tmpTokenName);
      window.location.href = pathname + "?" + params.toString();
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
