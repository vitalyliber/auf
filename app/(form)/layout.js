import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

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
        {children}
        <Toaster toastOptions={{ duration: 8000 }} />
      </body>
    </html>
  );
}
