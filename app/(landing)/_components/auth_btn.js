"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAuthTokenAction,
  logoutAction,
} from "@/app/(landing)/_components/auth_actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import getUserJWTByTmpToken from "@/actions";

export default function Auth_btn({
  SignInComponent,
  SignOutComponent,
  appName,
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const searchParams = useSearchParams();

  const getAuthToken = useCallback(async () => {
    const token = await getAuthTokenAction();
    console.log(token)
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
    const token = searchParams.get("auf_token");
    // @TODO make a http request to get the JWT instead of calling the the server action
    await getUserJWTByTmpToken(token);
    function removeQueryParam(url, paramToRemove) {
      const urlObject = new URL(url);
      urlObject.searchParams.delete(paramToRemove);
      return urlObject.toString();
    }
    removeQueryParam(window.location.href);
  }, [searchParams]);

  useEffect(() => {
    setPersistentToken();
  }, [searchParams]);

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
