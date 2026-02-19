"use client";

import SOSButton from "@/components/layout/SOSButton";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      <main>
        {children}
      </main>
      <SOSButton />
    </div>
  );
}
