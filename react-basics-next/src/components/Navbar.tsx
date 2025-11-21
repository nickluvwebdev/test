"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const link = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      className={`rounded px-3 py-2 text-sm font-medium ${
        pathname === href
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="flex items-center justify-between border-b bg-white px-6 py-3">
      <span className="text-lg font-semibold text-blue-700">React Basics</span>
      <div className="flex gap-2">
        {link("/", "Home")}
        {link("/about", "About")}
        {link("/contact", "Contact")}
        {link("/team/member", "Team")}
      </div>
    </nav>
  );
}
