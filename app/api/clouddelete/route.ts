import sha1 from "sha1";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    if (!url) {
      return NextResponse.json({ success: false, message: "no url found" });
    }
    const regex = /\/upload\/v\d+\/(uploadimages\/[^.]+)\.\w{3,4}$/;
    // const publicId = url.match(regex);
    // const publicId = preg_match("/upload/(?:vd+/)?([^.]+)/", url, $matches);
    const getPublicId = url.split("/").pop()?.split(".")[0] || "";
    const timestamp = new Date().getTime();
    const string = `public_id=${getPublicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
    const signature = sha1(string);

    const formData = new FormData();
    formData.append("public_id", getPublicId);
    formData.append("signature", signature);
    formData.append("api_key", process.env.CLOUDINARY_API_KEY as string);
    formData.append("timestamp", timestamp.toString());

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );
    await res.json();
    return NextResponse.json({
      message: "Success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", status: 500 });
  }
}
