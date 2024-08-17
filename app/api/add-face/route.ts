import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: any) {
  try {
    const res = await request.json();
    const { seenImages } = res;

    for (const image of seenImages) {
      console.log(image);

      let memorabilityValue = 0;

      const existingImage = await prisma.face.findUnique({
        where: {
          faceKey: String(image.key),
        },
      });

      if (existingImage) {
        memorabilityValue =
          (image.recognizeFrequency + existingImage.correctness) /
          Math.sqrt(image.occurrence + existingImage.occurrence);
      } else {
        memorabilityValue =
          image.recognizeFrequency / Math.sqrt(image.occurrence);
      }

      if (image.occurrence > 0) {
        await prisma.face.upsert({
          where: {
            faceKey: String(image.key),
          },
          update: {
            correctness: {
              increment: image.recognizeFrequency,
            },
            occurrence: {
              increment: image.occurrence,
            },
            memorability: memorabilityValue,
          },
          create: {
            faceKey: String(image.key),
            correctness: image.recognizeFrequency,
            occurrence: image.occurrence,
            memorability: memorabilityValue,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
  }
}
