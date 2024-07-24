"use client";

import { appUrl, tokenName } from "./constants";
import { logoutAction } from "./actions";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import useCurrentUser from "./useCurrentUser";
import useUpdateOnlineAt from "./useUpdateOnlineAt";

export default function AuthBtn({
  SignInComponent,
  SignOutComponent,
  appName,
  redirectUrl
}) {
  const pathname = usePathname()
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
        <Link href={`${appUrl}/${appName}?redirect_url=${redirectUrl || pathname}`}>{SignInComponent}</Link>
      )}
    </>
  );
}
