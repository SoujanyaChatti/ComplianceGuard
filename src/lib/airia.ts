import { simulationScenarios } from "./mock-data";

export async function simulateViolation(scenarioKey: string, alertEmail: string) {
  const scenario = simulationScenarios.find((s) => s.key === scenarioKey);
  if (!scenario) throw new Error("Invalid scenario");

  const input = `${scenario.prompt}\n\nSend the Gmail alert to the email address specified in the input. If no email is specified, send to ramasoujanya9@gmail.com as default.\nAlert Email: ${alertEmail || "ramasoujanya9@gmail.com"}`;

  const response = await fetch("/api/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}
