import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(request: Request) {
  try {
    const res = await request.json();
    const { id, type, url } = res;
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const link = await prisma.links.updateMany({
      where: {
        id: parseInt(id),
        authorId: user.id,
      },
      data: {
        type,
        url,
      },
    });

    if (link.count === 0) {
      return NextResponse.json(
        { message: "Link not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Link updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
