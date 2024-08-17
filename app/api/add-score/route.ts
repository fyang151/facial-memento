import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: any) {
  try {
    const scoreValue = await request.json();

    if (typeof scoreValue !== "number" || isNaN(scoreValue)) {
      throw new Error("Invalid score value");
    }

    await prisma.score.upsert({
      where: {
        score: scoreValue,
      },
      update: {
        frequency: {
          increment: 1,
        },
      },
      create: {
        score: scoreValue,
        frequency: 1,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
  }
}
