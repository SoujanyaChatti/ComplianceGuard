"use client";

import { usePathname } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/approvals": "Pending HITL Approvals",
  "/reports": "Incident Reports",
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
      <h1 className="text-xl font-semibold text-white">{title}</h1>

      <div className="flex items-center gap-4">
        {/* System Active indicator */}
        <div className="flex items-center gap-2 text-sm text-green-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          System Active
        </div>

        {/* Simulate Violation button */}
        <Link
          href="/dashboard#simulate"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          Simulate Violation
        </Link>
      </div>
    </header>
  );
}
