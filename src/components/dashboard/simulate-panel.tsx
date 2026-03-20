"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { simulationScenarios, GOOGLE_DOC_LINK } from "@/lib/mock-data";
import { simulateViolation } from "@/lib/airia";
import {
  AlertTriangle,
  Loader2,
  Mail,
  ExternalLink,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";

export function SimulatePanel() {
  const [selectedScenario, setSelectedScenario] = useState(simulationScenarios[0].key);
  const [alertEmail, setAlertEmail] = useState("compliance@yourcompany.com");
  const [loading, setLoading] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedLabel = simulationScenarios.find((s) => s.key === selectedScenario)?.label || "";
  const isClean = selectedScenario === "clean";

  const handleSimulate = async () => {
    setLoading(true);
    setTriggered(false);
    setError(null);

    try {
      await simulateViolation(selectedScenario, alertEmail || "ramasoujanya9@gmail.com");
      setTriggered(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Simulation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card id="simulate">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Simulate Violation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scenario Selector */}
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            Select Scenario
          </label>
          <select
            value={selectedScenario}
            onChange={(e) => {
              setSelectedScenario(e.target.value);
              setTriggered(false);
              setError(null);
            }}
            className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {simulationScenarios.map((s) => (
              <option key={s.key} value={s.key} className="bg-card">
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            <Mail className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            Send alert to:
          </label>
          <input
            type="email"
            value={alertEmail}
            onChange={(e) => setAlertEmail(e.target.value)}
            placeholder="Enter your email to receive the compliance alert"
            className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Simulate Button */}
        <Button
          variant="destructive"
          size="lg"
          className="w-full text-base font-semibold py-6"
          onClick={handleSimulate}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Triggering Airia Pipeline...
            </>
          ) : (
            <>🔴 Simulate Violation</>
          )}
        </Button>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
            <p className="font-medium">Simulation Error</p>
            <p className="mt-1 text-red-300">{error}</p>
          </div>
        )}

        {/* Success — Pipeline Triggered */}
        {triggered && !loading && (
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 space-y-4 animate-fade-in-down">
            {/* Success header */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-green-400">
                  Pipeline Triggered Successfully!
                </h4>
                <p className="text-sm text-muted-foreground">
                  ComplianceGuard is analyzing the violation via Airia
                </p>
              </div>
            </div>

            {/* Scenario info */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Scenario</p>
              <p className="text-sm font-medium text-white">{selectedLabel}</p>
            </div>

            {/* Status cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-card rounded-lg p-3 border border-border flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email Alert</p>
                  <p className="text-sm text-white truncate">
                    {alertEmail || "ramasoujanya9@gmail.com"}
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="text-sm text-white">60–90 seconds</p>
                </div>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border flex items-center gap-3">
                <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Report</p>
                  <p className="text-sm text-white">Auto-generated</p>
                </div>
              </div>
            </div>

            {/* What to expect */}
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
              <p className="text-xs font-medium text-accent mb-2">What happens next:</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> AI compliance analysis running
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">⏳</span> Email alert will arrive in your inbox within 90 seconds
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">⏳</span> Incident report will be created in Google Docs
                </li>
              </ul>
            </div>

            {/* View Report Link */}
            <a
              href={GOOGLE_DOC_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Incident Report
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
