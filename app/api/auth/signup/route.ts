import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { signIn } from "@/auth";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  const res = await request.json();
  const { email, password } = res;

  // const already

  const alreadyExist = await prisma.user.findUnique({
    where: { email },
  });

  if (alreadyExist) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const hashedPassword = await hash(password, 12);

    console.log(hashedPassword);

    const result = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    // const loginNewUser = await signIn("credentials", {
    //   redirect: false,
    //   callbackUrl: "/",
    //   email,
    //   password,
    // });

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(NextResponse.json({ result, loginNewUser }));
    //   }, 3000);
    // });
    return NextResponse.json({ result });
  }
}
