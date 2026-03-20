"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockEvents, type ComplianceEvent, GOOGLE_DOC_LINK } from "@/lib/mock-data";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const severityVariant = (s: string) => {
  switch (s) {
    case "HIGH": return "high" as const;
    case "MEDIUM": return "medium" as const;
    case "LOW": return "low" as const;
    default: return "none" as const;
  }
};

const categoryVariant = (c: string) => {
  switch (c) {
    case "PII": return "pii" as const;
    case "financial": return "financial" as const;
    case "health": return "health" as const;
    case "public": return "public" as const;
    case "confidential": return "confidential" as const;
    case "HR/biometric": return "hr" as const;
    default: return "default" as const;
  }
};

export function LiveEventFeed() {
  const [selectedEvent, setSelectedEvent] = useState<ComplianceEvent | null>(null);

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            Live Event Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
            {mockEvents.map((event, idx) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all text-left group",
                  idx === 0 && "animate-fade-in-down"
                )}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full ${event.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}
                >
                  {event.userInitials}
                </div>

                {/* Email + Tool */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground truncate">
                    {event.userEmail}
                  </p>
                  <p className="text-xs text-muted-foreground">{event.aiTool}</p>
                </div>

                {/* Category */}
                <Badge variant={categoryVariant(event.dataCategory)} className="text-[10px] shrink-0">
                  {event.dataCategory}
                </Badge>

                {/* Severity */}
                <Badge
                  variant={severityVariant(event.severity)}
                  className={cn("text-[10px] shrink-0", event.severity === "HIGH" && "animate-pulse")}
                >
                  {event.severity}
                </Badge>

                {/* Time */}
                <span className="text-[11px] text-muted-foreground shrink-0 w-16 text-right">
                  {event.timestamp}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-card border border-border rounded-xl p-6 w-full max-w-lg mx-4 animate-fade-in-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Event Details</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${selectedEvent.avatarColor} flex items-center justify-center text-sm font-bold text-white`}
                >
                  {selectedEvent.userInitials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{selectedEvent.userEmail}</p>
                  <p className="text-xs text-muted-foreground">Tool: {selectedEvent.aiTool}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Severity</p>
                  <Badge variant={severityVariant(selectedEvent.severity)}>
                    {selectedEvent.severity}
                  </Badge>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Regulation</p>
                  <p className="text-sm font-medium text-white">{selectedEvent.regulation}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Data Category</p>
                  <Badge variant={categoryVariant(selectedEvent.dataCategory)}>
                    {selectedEvent.dataCategory}
                  </Badge>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Detected</p>
                  <p className="text-sm font-medium text-white">{selectedEvent.timestamp}</p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Summary</p>
                <p className="text-sm text-foreground">{selectedEvent.summary}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <a
                  href={GOOGLE_DOC_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View Incident Report
                </a>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 border border-border hover:bg-muted text-sm font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
