import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeResume } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { resumeId } = await req.json();

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    if (!resume.extractedText) {
      return NextResponse.json(
        { error: "Resume text not found" },
        { status: 400 }
      );
    }

    const rawResponse = await analyzeResume(
      resume.extractedText
    );

    const analysis = JSON.parse(rawResponse);

    await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        atsScore: analysis.atsScore,
        analysis,
      },
    });

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}