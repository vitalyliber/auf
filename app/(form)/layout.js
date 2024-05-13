import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster toastOptions={{ duration: 8000 }} />
      </body>
    </html>
  );
}
