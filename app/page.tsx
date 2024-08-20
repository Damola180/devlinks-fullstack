import { auth } from "@/auth";

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
