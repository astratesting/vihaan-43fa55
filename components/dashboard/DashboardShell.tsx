"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

interface DashboardShellProps {
  children: React.ReactNode;
  firstName?: string | null;
  lastName?: string | null;
}

export default function DashboardShell({ children, firstName, lastName }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Topbar
        firstName={firstName}
        lastName={lastName}
        onMenuClick={() => setMobileOpen(!mobileOpen)}
      />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="pt-16 lg:pl-60 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
