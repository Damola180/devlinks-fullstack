export async function imageToPrisma(imageUrl: string, method: string) {
  console.log("postimage jameson 75");
  const body = JSON.stringify({ imageUrl });

  try {
    const response = await fetch(
      method === "POST" ? "/api/postimg" : "/api/patchImg",
      {
        method: method,
        headers: { "Content-Type": "application/json" },
        body,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in imageToPrisma:", error);
    throw new Error("Failed to send image URL to Prisma");
  }
}
