import { ReactNode } from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
