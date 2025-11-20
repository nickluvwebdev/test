import "./globals.css";

export const metadata = {
  title: "Next.js App",
  description: "ITCS257 Lab",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
