import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { platform, linkurl } = res;
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        userLinks: {
          create: {
            type: platform,
            url: linkurl,
          },
        },
      },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
