import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
const protectedRoutes = ["/application"];
const unprotectedRoutes = ["/login", "/signup"];

export default async function middleware(request: NextRequest) {
  // const session = await auth();
  // const isProtectedRoute = protectedRoutes.some((prefix) =>
  //   request.nextUrl.pathname.startsWith(prefix)
  // );
  // const unisProtectedRoute = unprotectedRoutes.some((prefix) =>
  //   request.nextUrl.pathname.startsWith(prefix)
  // );
  // if (!session && isProtectedRoute) {
  //   const absoluteURL = new URL("/login", request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
  // if (session && unisProtectedRoute) {
  //   const absoluteURL = new URL("/", request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
}
