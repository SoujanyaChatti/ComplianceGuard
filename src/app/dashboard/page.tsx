"use client";

import { KPICards } from "@/components/dashboard/kpi-cards";
import { LiveEventFeed } from "@/components/dashboard/live-event-feed";
import { SeverityChart } from "@/components/dashboard/severity-chart";
import { RegulationPie } from "@/components/dashboard/regulation-pie";
import { SimulatePanel } from "@/components/dashboard/simulate-panel";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Section 1: KPI Cards */}
      <KPICards />

      {/* Section 2: Live Feed + Severity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <LiveEventFeed />
        </div>
        <div className="lg:col-span-2">
          <SeverityChart />
        </div>
      </div>

      {/* Section 3: Regulation Breakdown */}
      <RegulationPie />

      {/* Section 4: Simulate Violation */}
      <SimulatePanel />
    </div>
  );
}
