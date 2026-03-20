"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockApprovals, type ApprovalItem } from "@/lib/mock-data";
import { CheckCircle2, Loader2, ShieldAlert, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>(mockApprovals);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setLoadingId(id);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" as const } : a))
    );
    setLoadingId(null);
  };

  const handleDismiss = async (id: string) => {
    setLoadingId(id);
    await new Promise((r) => setTimeout(r, 800));
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "dismissed" as const } : a))
    );
    setLoadingId(null);
  };

  const handleEscalate = async (id: string) => {
    setLoadingId(id);
    await new Promise((r) => setTimeout(r, 800));
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "escalated" as const } : a))
    );
    setLoadingId(null);
  };

  const pendingCount = approvals.filter((a) => a.status === "pending").length;
  const allResolved = pendingCount === 0;

  return (
    <div className="space-y-6">
      {allResolved ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4 animate-pulse-green">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">No Pending Approvals</h2>
          <p className="text-muted-foreground mt-2">All incidents have been reviewed and processed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {approvals.map((approval) => (
            <Card
              key={approval.id}
              className={cn(
                "relative overflow-hidden transition-all duration-500",
                approval.status === "approved" && "border-green-500/30 bg-green-500/5",
                approval.status === "dismissed" && "opacity-50",
                approval.status === "escalated" && "border-red-500/30 bg-red-500/5"
              )}
            >
              {/* Red left border for HIGH severity */}
              {approval.status === "pending" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
              )}

              {/* Approved stamp overlay */}
              {approval.status === "approved" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
              )}

              <div className="p-6 pl-7">
                {/* Status stamp */}
                {approval.status !== "pending" && (
                  <div className="mb-4 animate-fade-in-down">
                    <Badge
                      variant={
                        approval.status === "approved"
                          ? "resolved"
                          : approval.status === "escalated"
                          ? "escalated"
                          : "none"
                      }
                      className="text-sm px-3 py-1"
                    >
                      {approval.status === "approved" && "✅ Approved"}
                      {approval.status === "dismissed" && "Dismissed"}
                      {approval.status === "escalated" && "⬆️ Escalated"}
                    </Badge>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    {/* User + Tool */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-white">
                          {approval.userEmail}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        via {approval.aiTool}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-foreground leading-relaxed">
                      {approval.summary}
                    </p>

                    {/* Regulation + Severity badges */}
                    <div className="flex items-center gap-2">
                      <Badge variant="high">{approval.severity}</Badge>
                      <Badge variant="default">{approval.regulation}</Badge>
                      <span className="text-xs text-muted-foreground ml-2">
                        {approval.timeElapsed}
                      </span>
                    </div>

                    {/* Recommended Action */}
                    <div className="bg-muted/50 rounded-lg p-3 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">
                        Recommended Action
                      </p>
                      <p className="text-sm text-foreground">
                        {approval.recommendedAction}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {approval.status === "pending" && (
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleApprove(approval.id)}
                      disabled={loadingId === approval.id}
                    >
                      {loadingId === approval.id ? (
                        <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                      ) : null}
                      ✅ Approve Response
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDismiss(approval.id)}
                      disabled={loadingId === approval.id}
                      className="text-muted-foreground"
                    >
                      ❌ Dismiss
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEscalate(approval.id)}
                      disabled={loadingId === approval.id}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      Escalate
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
