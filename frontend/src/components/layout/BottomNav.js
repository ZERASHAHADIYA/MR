"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const path = usePathname();

  const nav = [
    { name: "Home", href: "/dashboard" },
    { name: "AI", href: "/ai-check" },
    { name: "Labs", href: "/lab-tests" },
    { name: "Consult", href: "/consult" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
      {nav.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-sm ${
            path === item.href ? "font-semibold" : "text-gray-500"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
