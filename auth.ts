import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./app/lib/prisma";
import { CredentialsSignin } from "next-auth";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },

      authorize: async (credentials) => {
        console.log(credentials);
        const user = await prisma.user.findMany({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user[0]) {
          return null;
        }

        const isMatched = await compare(
          credentials.password as string,
          user[0]?.password
        );
        if (!isMatched) {
          return null;
        }

        return user[0];
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
