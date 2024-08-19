export async function profileUPDATE(firstName: string, lastName: string) {
  console.log("postNames jameson 00998");
  const body = JSON.stringify({ firstName, lastName });

  try {
    const response = await fetch("/api/patchprofilenames", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in ProfileNamestoPrisma:", error);
    throw new Error("Failed to send Profile Names to Prisma");
  }
}
