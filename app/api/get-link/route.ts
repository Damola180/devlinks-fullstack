import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        photos: {
          select: {
            url: true,
          },
        },
        userLinks: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const responseData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      img: user.photos?.url || null, // Assuming `photos` is optional
      userLinks: user.userLinks,
    };

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
