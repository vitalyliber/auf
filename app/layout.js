import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <span className="underline ml-2">Learn more</span>
        </div>
        <header className="grid grid-cols-3 py-10 px-6 md:px-14">
          <div className="text-3xl">Auf.</div>
          <div>
            <nav className="hidden md:block">
              <ul className="flex justify-center">
                <li className="btn">Blog</li>
                <li className="btn">Docs</li>
                <li className="btn">Pricing</li>
              </ul>
            </nav>
          </div>
          <div className="flex space-x-5 justify-end items-end md:items-center">
            <div className="btn hidden md:block">Login</div>
            <div className="btn-black hidden md:block">Start for free</div>
            <div className="md:hidden text-zinc-600">Menu</div>
          </div>
        </header>
        {children}
        <Toaster toastOptions={{ duration: 8000 }} />
      </body>
    </html>
  );
}
