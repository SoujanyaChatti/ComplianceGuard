"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockReports, GOOGLE_DOC_LINK } from "@/lib/mock-data";
import { ExternalLink, Download, Filter } from "lucide-react";

const statusVariant = (s: string) => {
  switch (s) {
    case "Resolved": return "resolved" as const;
    case "Pending": return "pending" as const;
    case "Escalated": return "escalated" as const;
    default: return "default" as const;
  }
};

const severityVariant = (s: string) => {
  switch (s) {
    case "HIGH": return "high" as const;
    case "MEDIUM": return "medium" as const;
    case "LOW": return "low" as const;
    default: return "none" as const;
  }
};

export default function ReportsPage() {
  const [regFilter, setRegFilter] = useState("all");
  const [sevFilter, setSevFilter] = useState("all");

  const filtered = mockReports.filter((r) => {
    if (regFilter !== "all" && r.regulation !== regFilter) return false;
    if (sevFilter !== "all" && r.severity !== sevFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            Filters:
          </div>

          <select
            value={regFilter}
            onChange={(e) => setRegFilter(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all" className="bg-card">All Regulations</option>
            <option value="GDPR" className="bg-card">GDPR</option>
            <option value="HIPAA" className="bg-card">HIPAA</option>
            <option value="SOC2" className="bg-card">SOC2</option>
            <option value="EU AI Act" className="bg-card">EU AI Act</option>
            <option value="Internal" className="bg-card">Internal</option>
          </select>

          <select
            value={sevFilter}
            onChange={(e) => setSevFilter(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all" className="bg-card">All Severities</option>
            <option value="HIGH" className="bg-card">HIGH</option>
            <option value="MEDIUM" className="bg-card">MEDIUM</option>
            <option value="LOW" className="bg-card">LOW</option>
          </select>

          <div className="ml-auto text-xs text-muted-foreground">
            {filtered.length} of {mockReports.length} reports
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Incident ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Regulation
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Severity
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Reviewer
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3.5 text-sm text-foreground">
                    {report.date}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-mono text-accent">
                    {report.incidentId}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-foreground">
                    {report.user}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="default" className="text-[10px]">
                      {report.regulation}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={severityVariant(report.severity)} className="text-[10px]">
                      {report.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">
                    {report.reviewer}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={statusVariant(report.status)} className="text-[10px]">
                      {report.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={GOOGLE_DOC_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm" className="text-xs gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Report
                        </Button>
                      </a>
                      <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground">
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No reports match the selected filters.
          </div>
        )}
      </Card>
    </div>
  );
}
