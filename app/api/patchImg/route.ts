import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(request: Request) {
  try {
    const res = await request.json();
    const { imageUrl } = res;
    const session = await auth();
    console.log(imageUrl, "whereare");

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const linkImageUrl = await prisma.user.update({
      where: { email: session.user.email },

      data: {
        imageurl: imageUrl,
      },
    });

    if (linkImageUrl) {
      return NextResponse.json({ message: "Image updated successfully" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
