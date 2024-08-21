import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Router, { useRouter } from "next/navigation";

export default async function Home() {
  const session = await auth();

  return (
    <>
      Link sharing App
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <p>{session?.user?.email}</p>
    </>
  );
}
