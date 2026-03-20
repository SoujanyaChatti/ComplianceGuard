"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

const kpis = [
  {
    title: "Total Events Today",
    value: "847",
    icon: TrendingUp,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    title: "High Severity",
    value: "23",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-500/10",
    trend: "+3 from yesterday",
    trendUp: true,
    pulse: true,
  },
  {
    title: "Pending Approvals",
    value: "3",
    icon: Clock,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    trend: "Requires attention",
    trendUp: false,
    pulse: true,
  },
  {
    title: "Resolved Today",
    value: "12",
    icon: CheckCircle2,
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
    trend: "92% resolution rate",
    trendUp: false,
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card
          key={kpi.title}
          className="p-5 hover:border-border/60 transition-all hover:shadow-lg hover:shadow-black/20"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{kpi.title}</p>
              <p className={`text-3xl font-bold mt-1 ${kpi.iconColor}`}>
                {kpi.value}
              </p>
            </div>
            <div
              className={`p-2.5 rounded-lg ${kpi.iconBg} ${kpi.pulse ? "animate-pulse" : ""}`}
            >
              <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            {kpi.trendUp && (
              <TrendingUp className="w-3 h-3 text-green-400" />
            )}
            <span>{kpi.trend}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
