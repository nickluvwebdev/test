import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "React Basics Lab",
  description: "ITCS257 Next.js + React basics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-5xl">{children}</div>
      </body>
    </html>
  );
}
