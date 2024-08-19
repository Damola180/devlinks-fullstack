"use client";
import { auth } from "@/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/application");
    } else {
      router.push("/login");
    }
  }, [session, router]);
  return (
    <>
      Link sharing App
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <p>{session?.user?.email}</p>
    </>
  );
}
