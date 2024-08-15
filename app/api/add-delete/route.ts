import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const res = await request.json();
    const { id } = res;

    await prisma.links.delete({
      where: { id: id },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
