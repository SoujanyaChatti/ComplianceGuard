export interface ComplianceEvent {
  id: string;
  userEmail: string;
  userInitials: string;
  avatarColor: string;
  aiTool: string;
  dataCategory: "PII" | "financial" | "health" | "public" | "confidential" | "HR/biometric";
  regulation: "GDPR" | "HIPAA" | "SOC2" | "EU_AI_ACT" | "INTERNAL" | "NONE";
  severity: "HIGH" | "MEDIUM" | "LOW" | "NONE";
  timestamp: string;
  summary: string;
}

export interface ApprovalItem {
  id: string;
  userEmail: string;
  aiTool: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  regulation: string;
  summary: string;
  recommendedAction: string;
  timeElapsed: string;
  status: "pending" | "approved" | "dismissed" | "escalated";
}

export interface ReportItem {
  id: string;
  date: string;
  incidentId: string;
  user: string;
  regulation: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | "NONE";
  reviewer: string;
  status: "Resolved" | "Pending" | "Escalated";
}

export const mockEvents: ComplianceEvent[] = [
  {
    id: "EVT-001",
    userEmail: "sarah.johnson@acme.com",
    userInitials: "SJ",
    avatarColor: "bg-red-500",
    aiTool: "ChatGPT",
    dataCategory: "PII",
    regulation: "GDPR",
    severity: "HIGH",
    timestamp: "2 min ago",
    summary: "Processed EU customer list containing 500 names, emails, and dates of birth via ChatGPT.",
  },
  {
    id: "EVT-002",
    userEmail: "mike.chen@acme.com",
    userInitials: "MC",
    avatarColor: "bg-purple-500",
    aiTool: "Gemini",
    dataCategory: "health",
    regulation: "HIPAA",
    severity: "HIGH",
    timestamp: "15 min ago",
    summary: "Analyzed patient medication records for 200 clinical trial participants using Gemini.",
  },
  {
    id: "EVT-003",
    userEmail: "alex.patel@acme.com",
    userInitials: "AP",
    avatarColor: "bg-orange-500",
    aiTool: "Perplexity",
    dataCategory: "financial",
    regulation: "SOC2",
    severity: "MEDIUM",
    timestamp: "1 hr ago",
    summary: "Shared Q3 revenue figures and acquisition strategy document with Perplexity AI.",
  },
  {
    id: "EVT-004",
    userEmail: "james.liu@acme.com",
    userInitials: "JL",
    avatarColor: "bg-pink-500",
    aiTool: "ChatGPT",
    dataCategory: "HR/biometric",
    regulation: "EU_AI_ACT",
    severity: "HIGH",
    timestamp: "2 hr ago",
    summary: "Used ChatGPT to screen 150 job candidates and generate hiring recommendations.",
  },
  {
    id: "EVT-005",
    userEmail: "priya.sharma@acme.com",
    userInitials: "PS",
    avatarColor: "bg-green-500",
    aiTool: "Copilot",
    dataCategory: "public",
    regulation: "NONE",
    severity: "NONE",
    timestamp: "3 hr ago",
    summary: "Used Microsoft Copilot to draft a marketing blog post about company culture.",
  },
  {
    id: "EVT-006",
    userEmail: "david.kim@acme.com",
    userInitials: "DK",
    avatarColor: "bg-yellow-500",
    aiTool: "Gemini",
    dataCategory: "confidential",
    regulation: "INTERNAL",
    severity: "MEDIUM",
    timestamp: "4 hr ago",
    summary: "Uploaded confidential internal strategy memo to Gemini for summarization.",
  },
  {
    id: "EVT-007",
    userEmail: "lisa.wong@acme.com",
    userInitials: "LW",
    avatarColor: "bg-red-400",
    aiTool: "ChatGPT",
    dataCategory: "PII",
    regulation: "GDPR",
    severity: "HIGH",
    timestamp: "5 hr ago",
    summary: "Shared customer contact database containing EU personal data with ChatGPT.",
  },
  {
    id: "EVT-008",
    userEmail: "raj.kumar@acme.com",
    userInitials: "RK",
    avatarColor: "bg-blue-500",
    aiTool: "Bard",
    dataCategory: "financial",
    regulation: "SOC2",
    severity: "MEDIUM",
    timestamp: "6 hr ago",
    summary: "Analyzed quarterly financial projections using Google Bard AI assistant.",
  },
];

export const mockApprovals: ApprovalItem[] = [
  {
    id: "APR-001",
    userEmail: "sarah.johnson@acme.com",
    aiTool: "ChatGPT",
    severity: "HIGH",
    regulation: "GDPR",
    summary: "EU PII data (500 customer records) processed through unauthorized AI tool without data processing agreement.",
    recommendedAction: "Block AI response, notify DPO, initiate data breach assessment under GDPR Art. 33",
    timeElapsed: "12 minutes ago",
    status: "pending",
  },
  {
    id: "APR-002",
    userEmail: "mike.chen@acme.com",
    aiTool: "Gemini",
    severity: "HIGH",
    regulation: "HIPAA",
    summary: "Protected Health Information (PHI) for 200 patients shared with external AI service without BAA.",
    recommendedAction: "Quarantine data, notify Privacy Officer, file OCR breach report within 60 days",
    timeElapsed: "28 minutes ago",
    status: "pending",
  },
  {
    id: "APR-003",
    userEmail: "james.liu@acme.com",
    aiTool: "ChatGPT",
    severity: "HIGH",
    regulation: "EU AI Act",
    summary: "High-risk AI system used for employment decisions without required human oversight or bias audit.",
    recommendedAction: "Suspend automated screening, conduct algorithmic impact assessment per EU AI Act Art. 14",
    timeElapsed: "1 hour ago",
    status: "pending",
  },
];

export const mockReports: ReportItem[] = [
  {
    id: "RPT-001",
    date: "2026-03-19",
    incidentId: "INC-2026-0847",
    user: "sarah.johnson@acme.com",
    regulation: "GDPR",
    severity: "HIGH",
    reviewer: "Maria Santos",
    status: "Resolved",
  },
  {
    id: "RPT-002",
    date: "2026-03-19",
    incidentId: "INC-2026-0846",
    user: "mike.chen@acme.com",
    regulation: "HIPAA",
    severity: "HIGH",
    reviewer: "Dr. James Park",
    status: "Pending",
  },
  {
    id: "RPT-003",
    date: "2026-03-18",
    incidentId: "INC-2026-0842",
    user: "alex.patel@acme.com",
    regulation: "SOC2",
    severity: "MEDIUM",
    reviewer: "Emily Richards",
    status: "Resolved",
  },
  {
    id: "RPT-004",
    date: "2026-03-18",
    incidentId: "INC-2026-0839",
    user: "james.liu@acme.com",
    regulation: "EU AI Act",
    severity: "HIGH",
    reviewer: "Thomas Mueller",
    status: "Escalated",
  },
  {
    id: "RPT-005",
    date: "2026-03-17",
    incidentId: "INC-2026-0835",
    user: "david.kim@acme.com",
    regulation: "Internal",
    severity: "MEDIUM",
    reviewer: "Sarah Chen",
    status: "Resolved",
  },
];

export const severityTrendData = [
  { day: "Mon", high: 5, medium: 12, low: 18 },
  { day: "Tue", high: 8, medium: 15, low: 22 },
  { day: "Wed", high: 3, medium: 10, low: 16 },
  { day: "Thu", high: 12, medium: 18, low: 25 },
  { day: "Fri", high: 7, medium: 14, low: 20 },
  { day: "Sat", high: 4, medium: 8, low: 12 },
  { day: "Sun", high: 6, medium: 11, low: 15 },
];

export const regulationBreakdownData = [
  { name: "GDPR", value: 35, fill: "#ef4444" },
  { name: "HIPAA", value: 22, fill: "#a855f7" },
  { name: "SOC2", value: 18, fill: "#3b82f6" },
  { name: "EU AI Act", value: 15, fill: "#f97316" },
  { name: "Internal", value: 10, fill: "#6b7280" },
];

export const GOOGLE_DOC_LINK = "https://docs.google.com/document/d/13tFybj_FvZXJi7iDAzVCx5yelrVkF4ESFbufmlSlrYU";

export const simulationScenarios = [
  {
    key: "gdpr",
    label: "GDPR — EU PII Exposure (sarah.johnson@acme.com)",
    prompt: "sarah.johnson@acme.com used ChatGPT to process a customer list containing names, emails, and dates of birth for 500 EU-based clients. Logged via Slack #ai-usage channel at 2026-03-19T10:30:00Z.",
  },
  {
    key: "hipaa",
    label: "HIPAA — Patient Health Data (mike.chen@acme.com)",
    prompt: "mike.chen@acme.com used Gemini to analyze patient medication records for 200 clinical trial participants. Detected via email monitoring at 2026-03-19T11:00:00Z.",
  },
  {
    key: "soc2",
    label: "SOC2 — Financial Data Leak (alex.patel@acme.com)",
    prompt: "alex.patel@acme.com shared Q3 revenue figures and acquisition strategy document with Perplexity AI. Logged via API at 2026-03-19T12:00:00Z.",
  },
  {
    key: "eu_ai_act",
    label: "EU AI Act — Hiring Bias (james.liu@acme.com)",
    prompt: "james.liu@acme.com used ChatGPT to screen 150 job candidates and generate hiring recommendations based on resume scoring. Detected at 2026-03-19T13:00:00Z.",
  },
  {
    key: "clean",
    label: "Clean Event — No Violation (priya.sharma@acme.com)",
    prompt: "priya.sharma@acme.com used Microsoft Copilot to draft a marketing blog post about company culture. Logged at 2026-03-19T14:00:00Z.",
  },
];
