"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAuthTokenAction,
  logoutAction,
} from "@/app/(landing)/_components/auth_actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Auth_btn({
  SignInComponent,
  SignOutComponent,
  appName,
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const authFlow = useCallback(async () => {
    const token = await getAuthTokenAction();
    setAuthenticated(!!token);

    // If token is not exists generate the uniq id and put it to the cookies
    // Also, set the uniq ID to the auth link
  }, []);

  const handleLogout = () => {
    logoutAction();

    router.push("/");
  };

  useEffect(() => {
    authFlow().catch();
  }, [authFlow]);

  const appUrl = useMemo(() => {
    return process.env.NODE_ENV === "development"
      ? `http://localhost:3000/${appName}`
      : `https://auf.casply.com/${appName}`;
  }, [appName]);

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
