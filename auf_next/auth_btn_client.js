"use client";

import { appUrl } from "./constants";
import { logoutAction } from "./actions";
import Link from "next/link";
import useCurrentUser from "@/auf_next/useCurrentUser";

export default function AuthBtnClient({
  SignInComponent,
  SignOutComponent,
  appName,
}) {
  const user = useCurrentUser()

  const handleLogout = async () => {
    await fetch(`/api/tokens?token=${jwtToken}`, { method: "DELETE" });
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
