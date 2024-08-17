import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const scores = await prisma.score.findMany({
      orderBy: {
        score: "asc",
      },
    });
    return NextResponse.json({ success: true, scores });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch scores' }, { status: 500 });
  }
}
