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
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        imageurl: true,

        userLinks: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const responseData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageurl: user.imageurl || null, // Assuming `photos` is optional
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
