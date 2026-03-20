import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();

    const apiKey = process.env.AIRIA_API_KEY?.trim();
    const pipelineUrl = process.env.AIRIA_PIPELINE_URL?.trim();

    if (!apiKey || !pipelineUrl) {
      return NextResponse.json(
        { error: "AIRIA_API_KEY and AIRIA_PIPELINE_URL environment variables are required" },
        { status: 500 }
      );
    }

    const response = await fetch(pipelineUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        userInput: input,
        asyncOutput: true,
      }),
    });

    const rawText = await response.text();
    console.log("Airia response status:", response.status);
    console.log("Airia response body:", rawText);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Airia API error: ${response.status}`, details: rawText },
        { status: response.status }
      );
    }

    // Try to parse as JSON, fall back to raw text
    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      result = { rawOutput: rawText };
    }

    return NextResponse.json({
      success: true,
      message: "Pipeline triggered successfully",
      executionId: result.executionId || result.id || null,
      output: result.rawOutput || result.result || result.output || rawText,
      status: "processing",
    });
  } catch (error) {
    console.error("Simulation error:", error);
    return NextResponse.json(
      { error: "Failed to process simulation", details: String(error) },
      { status: 500 }
    );
  }
}
