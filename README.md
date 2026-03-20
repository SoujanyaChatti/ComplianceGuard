# ComplianceGuard

Enterprise AI Compliance Monitoring System built on **Airia**.

## Airia Pipeline

- **Pipeline ID:** `11bb8bb9-99db-42ba-b838-1c5ecbc3f95c`
- **API Endpoint:** `https://api.airia.ai/v2/PipelineExecution/{pipelineId}`

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts
- lucide-react
- Deploy target: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file:

```
AIRIA_API_KEY=your-api-key
AIRIA_PIPELINE_URL=https://api.airia.ai/v2/PipelineExecution/11bb8bb9-99db-42ba-b838-1c5ecbc3f95c
```

## Pages

- `/dashboard` — Live event feed, KPI cards, severity trends, simulate violation
- `/approvals` — Human-in-the-loop approval queue
- `/reports` — Incident reports table with filters
