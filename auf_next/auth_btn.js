"use client";

import { appUrl, tokenName } from "./constants";
import { logoutAction } from "./actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useCurrentUser from "./useCurrentUser";
import useUpdateOnlineAt from "./useUpdateOnlineAt";

export default function AuthBtn({
  SignInComponent,
  SignOutComponent,
  SignedInComponent,
  appName,
  redirectUrl,
}) {
  const pathname = usePathname();
  useUpdateOnlineAt();
  const user = useCurrentUser();

  const handleLogout = async () => {
    const originUrl = new URL(redirectUrl).origin;

    await fetch(`${originUrl}/api/tokens?${tokenName}=${user.apiToken}`, {
      method: "DELETE",
    });
    await logoutAction();

    window.location.href = "/";
  };

  return (
    <>
      {user.isLoggedIn && !SignedInComponent && (
        <div onClick={handleLogout}>{SignOutComponent}</div>
      )}
      {user.isLoggedIn && SignedInComponent && (
        <div onClick={handleLogout}>{SignedInComponent}</div>
      )}
      {!user.isLoggedIn && (
        <Link
          href={`${appUrl}/${appName}?redirect_url=${redirectUrl || pathname}`}
        >
          {SignInComponent}
        </Link>
      )}
    </>
  );
}
