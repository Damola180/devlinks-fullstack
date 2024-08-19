export async function handleShareSection(userId: string) {
  try {
    const response = await fetch(
      `/api/getlinkShare?userid=${encodeURIComponent(userId)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
