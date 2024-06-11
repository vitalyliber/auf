"use client";

import { appUrl, tokenName } from "./constants";
import { logoutAction } from "./actions";
import Link from "next/link";
import useCurrentUser from "@/auf_next/useCurrentUser";
import useUpdateOnlineAt from "@/auf_next/useUpdateOnlineAt";

export default function AuthBtnClient({
  SignInComponent,
  SignOutComponent,
  appName,
}) {
  useUpdateOnlineAt()
  const user = useCurrentUser();

  const handleLogout = async () => {
    await fetch(`${appUrl}/api/tokens?${tokenName}=${user.apiToken}`, {
      method: "DELETE",
    });
    await logoutAction();

    window.location.href = "/";
  };

  return (
    <>
      {user.isLoggedIn ? (
        <div onClick={handleLogout}>{SignOutComponent}</div>
      ) : (
        <Link href={`${appUrl}/${appName}`}>{SignInComponent}</Link>
      )}
    </>
  );
}
