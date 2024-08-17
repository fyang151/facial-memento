import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("HI!!!!!!!! ARE WE GETTING!!!!!!!!!!!!!!!!!!!!!");
  try {
    const scores = await prisma.score.findMany({
      orderBy: {
        score: "asc",
      },
    });
    console.log('scores from getscores:', scores);
    return NextResponse.json({ success: true, scores });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch scores' }, { status: 500 });
  }
}
