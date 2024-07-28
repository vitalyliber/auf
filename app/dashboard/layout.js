import "@/app/globals.css";
import { adminAppName, appUrl, AuthBtn } from "@/auf_next/index";
import Link from "next/link";

const metaTitle = "Auf";

export const metadata = {
  metadataBase: new URL("https://auf.casply.com"),
  title: {
    template: `%s | ${metaTitle}`,
    default: metaTitle
  },
  description: "Customer identity and access management in a few lines of code",
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
            redirectUrl={`${appUrl}/dashboard`}
            appName={adminAppName}
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
