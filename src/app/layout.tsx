import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Goyal — CS'27 @ DTU",
  description: "Portfolio of Yash Goyal — CS student at Delhi Technological University, developer, and researcher at the intersection of neurology and deep learning.",
  keywords: ["Yash Goyal", "DTU", "portfolio", "CS student", "web developer", "deep learning"],
  authors: [{ name: "Yash Goyal" }],
  icons: {
    icon: "/me.ico",
    shortcut: "/me.ico",
  },
  openGraph: {
    title: "Yash Goyal — CS'27 @ DTU",
    description: "Portfolio of Yash Goyal — developer and researcher.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ background: '#111a12', color: '#e8e4d8' }}>
        {children}
      </body>
    </html>
  );
}
