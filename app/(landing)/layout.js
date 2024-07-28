import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import { adminAppName, appUrl, AuthBtn } from "@/auf_next";

const inter = Inter({ subsets: ["latin"] });

const metaTitle = "Auf"

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
      <body className={inter.className}>
        <div className="bg-gray-100 py-5 text-center">
          <span className="bg-black text-white rounded-full px-4 py-2 text-sm mr-4 hidden md:inline">
            News
          </span>
          Get the access for free.
          <span className="underline ml-2 hidden">Learn more</span>
        </div>
        <header className="grid grid-cols-3 py-10 px-6 md:px-14">
          <div className="text-3xl flex items-center">Auf.</div>
          <div>
            <nav className="hidden md:block">
              <ul className="flex justify-center">
                <li className="btn hidden">Blog</li>
                <li className="flex items-center"><a href="https://www.npmjs.com/package/auf-next" className="btn">Docs</a></li>
                <li className="btn hidden">Pricing</li>
              </ul>
            </nav>
          </div>
          <div className="flex space-x-5 justify-end items-end md:items-center">
            <AuthBtn
              redirectUrl={`${appUrl}/dashboard`}
              appName={adminAppName}
              SignInComponent={<div className="btn block">Sign in</div>}
              SignOutComponent={<div className="btn block">Sign Out</div>}
            />
            <div className="hidden md:block">
              <AuthBtn
                redirectUrl={`${appUrl}/dashboard`}
                appName={adminAppName}
                SignInComponent={
                  <div className="btn-black">Start for free</div>
                }
                SignOutComponent={<div className="btn block">Sign Out</div>}
              />
            </div>
            <div className="hidden text-zinc-600">Menu</div>
          </div>
        </header>
        {children}
        <Toaster toastOptions={{ duration: 8000 }} />
      </body>
    </html>
  );
}
