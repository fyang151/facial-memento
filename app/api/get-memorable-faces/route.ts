import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const memorableFaces = await prisma.face.findMany({
      orderBy: {
        memorability: "desc",
      },
      take: 100,
    });
    return NextResponse.json({ success: true, memorableFaces });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch faces' }, { status: 500 });
  }
}
