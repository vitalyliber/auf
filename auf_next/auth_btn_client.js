"use client";

import { useCallback, useEffect, useState } from "react";
import { appUrl, temporaryTokenName } from "./constants";
import { getAuthTokenAction, logoutAction } from "./actions";
import Link from "next/link";

export default function AuthBtnClient({
  SignInComponent,
  SignOutComponent,
  appName,
}) {
  const [jwtToken, setJwtToken] = useState(false);

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
