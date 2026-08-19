import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Goyal - Portfolio",
  description: "Minimalist portfolio of Yash Goyal, CS student at DTU.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col antialiased bg-black text-white selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
