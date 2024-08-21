"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { handleShareSection } from "@/app/lib/shareSectionFn";
import {
  ImageTypeMap,
  LinksToShow,
  ShareTypeMap,
  nameEmailTypeMap,
} from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function Previewpage() {
  const [shareSection, setShareSection] = useState<ShareTypeMap>();

  const pathname = usePathname();

  const url = pathname;
  const regex = /(?<=\/preview\/)[\w-]+/;
  const match = url.match(regex);
  const typeToImageMap: ImageTypeMap = {
    Youtube: "/YoutubePre.png",
    Linkedin: "/LinkedInPre.png",
    Github: "/githubPre.png",
    Twitch: "/TwitchPre.png",
    Facebook: "/FacebookPre.png",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (match && match[0]) {
        try {
          const data = await handleShareSection(match[0]);
          const { firstName, lastName, email, imageurl, userLinks } = data;
          setShareSection({ firstName, lastName, email, imageurl, userLinks });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("No valid match found in the URL");
      }
    };

    fetchData();
  }, []);

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

  let linksToShow: LinksToShow[] = [];

  if (shareSection?.userLinks) {
    for (let i = 0; i < shareSection.userLinks.length; i++) {
      linksToShow.push(shareSection.userLinks[i]);
    }
  }

  return (
    <div className="">
      <div className="h-[357px] bg-Color1 absolute w-[100%] top-0 -z-10 rounded-b-3xl sm:block hidden "></div>
      <div className="sm:p-4 p-0 sm:mb-10">
        <div className=" mx-6 mt-6 sm:mb-6 mb-4 flex justify-between sm:p-4  z-20 bg-white rounded-xl">
          <Link href="/application">
            <button className="border-Color1 border text-base py-3 px-7 rounded-lg text-Color1">
              Back to Editor
            </button>
          </Link>

          <button
            onClick={handleShare}
            className=" border-Color1 bg-Color1 border text-base py-3 px-7 rounded-lg text-white"
          >
            Share link
          </button>
        </div>
      </div>

      <div className="w-[349px] bg-white  m-auto py-12 px-14 sm:shadow-custom-shadow rounded-3xl ">
        <div className="h-[110px] w-[110px] bg-Color10 rounded-full overflow-hidden mx-auto">
          {shareSection?.imageurl && (
            <img
              className="h-[110px] w-[110px] object-cover object-center"
              src={shareSection.imageurl}
              alt=""
            />
          )}
        </div>
        <div className="mt-0">
          <p
            className={`mt-6 ${
              shareSection?.firstName && shareSection?.lastName
                ? ""
                : "bg-Color10 w-[160px] h-[16px]"
            } mb-1 text-3xl font-bold text-center  `}
          >
            {shareSection?.firstName && shareSection?.lastName
              ? `${shareSection?.firstName} ${shareSection?.lastName}`
              : ""}
          </p>

          <p className="font-normal text-base text-center  mx-auto text-Color4">
            {shareSection?.email}
          </p>
        </div>

        <div className="sm:mt-14 mt-8">
          {linksToShow.map((item, index) => (
            <Link
              href={item.url}
              className="bg-Color10 rounded-lg w-[237px] h-[44px] mb-5 mx-auto flex items-center justify-center"
              key={index}
            >
              <Image
                src={typeToImageMap[item.type]}
                alt={item.type}
                width={237}
                height={44}
                className="h-auto "
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
