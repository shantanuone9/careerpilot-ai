import { analyzeResume } from "@/lib/gemini";
import { extractPdfText } from "@/lib/pdf";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

const buffer = Buffer.from(bytes);

// Extract text from PDF
console.time("PDF Extraction");
const extractedText = await extractPdfText(buffer);

console.log("===== PDF TEXT =====");
console.log(extractedText);
console.log("====================");
console.timeEnd("PDF Extraction");

// Convert file to Base64 for Cloudinary
const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    console.time("Cloudinary Upload");

const uploaded = await cloudinary.uploader.upload(base64, {
  folder: "careerpilot/resumes",
  resource_type: "raw",
});

console.timeEnd("Cloudinary Upload");

console.time("Database Save");

    const resume = await prisma.resume.create({
  data: {
    title: file.name,
    fileUrl: uploaded.secure_url,
    publicId: uploaded.public_id,
    extractedText,
    userId: (session.user as any).id,
  },
});

console.time("Gemini Analysis");

const aiResponse = await analyzeResume(extractedText);

const analysis = JSON.parse(aiResponse);

console.timeEnd("Gemini Analysis");

console.timeEnd("Database Save");

const updatedResume = await prisma.resume.update({
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
  resume: updatedResume,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}