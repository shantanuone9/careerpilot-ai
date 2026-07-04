import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const resume = await prisma.resume.findUnique({
      where: {
        id,
      },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    // Security check
    if (resume.userId !== (session.user as any).id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(
      resume.publicId,
      {
        resource_type: "raw",
      }
    );

    // Delete from Database
    await prisma.resume.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}