async function handlePost(selectedOption: string, link: string) {
  try {
    const response = await fetch("/api/add-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: selectedOption, linkurl: link }),
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function handleGet() {
  try {
    const response = await fetch(`/api/get-link`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function handlePATCH(id: number | undefined, type: string, url: string) {
  try {
    const response = await fetch("/api/add-patch", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, type, url }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function handleDELETE(id: number) {
  console.log(`Starting DELETE request for id: ${id}`);

  try {
    const response = await fetch("/api/add-delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
  } catch (error) {
    console.error("Error during DELETE request:", error);
  }
}

export { handlePost, handleGet, handlePATCH, handleDELETE };
