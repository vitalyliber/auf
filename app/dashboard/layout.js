import "@/app/globals.css";
import AuthBtn from "@/app/(landing)/_components/auth_btn";
import Link from "next/link";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="flex justify-between items-center px-16 py-7">
          <Link href="/dashboard">
            <div className="text-3xl">Auf.</div>
          </Link>
          <AuthBtn
            appName="auf"
            SignInComponent={<div className="btn hidden md:block">Sign in</div>}
            SignOutComponent={
              <div className="btn hidden md:block">Sign Out</div>
            }
          />
        </header>
        {children}
      </body>
    </html>
  );
}
