"use client";
import { usePathname } from "next/navigation";
import PillNavbar from "./PillNavbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar = pathname === '/' || pathname === '/auth' || pathname.startsWith('/doctor') || pathname.startsWith('/admin');

  if (hideNavbar) {
    return null;
  }

  return (
    <>
      <PillNavbar />
      <div className="pt-20" />
    </>
  );
}
