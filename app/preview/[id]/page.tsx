"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { handleShareSection } from "@/app/lib/shareSectionFn";
import { ShareTypeMap, nameEmailTypeMap } from "@/types";
import Link from "next/link";

export default function Previewpage() {
  const [shareSection, setShareSection] = useState<ShareTypeMap>();

  const pathname = usePathname();

  const url = pathname;
  const regex = /(?<=\/preview\/)[\w-]+/;
  const match = url.match(regex);

  useEffect(() => {
    const fetchData = async () => {
      if (match && match[0]) {
        try {
          const data = await handleShareSection(match[0]);
          const { firstName, lastName, email, imageurl, userLinks } = data;
          setShareSection({ firstName, lastName, email, imageurl, userLinks });
          console.log("Fetched data:", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("No valid match found in the URL");
      }
    };

    fetchData();
  }, []);
  console.log(shareSection);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: currentUrl,
        });
        console.log("Thanks for sharing!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for unsupported browsers
      console.log("Share not supported on this browser, provide a fallback.");
    }
  };

  return (
    <div className="h-[100px] z-40">
      <p className="text-Color9">
        {shareSection?.firstName} {shareSection?.lastName} {shareSection?.email}
      </p>

      <div>
        {shareSection?.userLinks.map((eachlinks: nameEmailTypeMap) => (
          <div key={eachlinks.id}>
            <p>{eachlinks.type}</p>
            <span>{eachlinks.url}</span>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Link href="/application">
          <button className="bg-Color1">Back to editor</button>
        </Link>

        <button onClick={handleShare} className="bg-Color4">
          Share link
        </button>
      </div>
    </div>
  );
}
