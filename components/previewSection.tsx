"use client";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { handleGet } from "@/app/lib/functions";
import { ImageTypeMap, LinkInitialData, nameEmailTypeMap } from "@/types";

import Image from "next/image";

// Define a type for the image mapping

export default function PreviewSection() {
  // const { callData, validateData } = context;
  const [initialData, setInitialData] = useState<LinkInitialData[]>([]);
  const [nameEmail, setnameEmail] = useState<nameEmailTypeMap>({});
  async function fetchData() {
    const data = await handleGet();
    const { firstName, lastName, email, imageurl } = data;

    setInitialData(data.userLinks);
    setnameEmail({ firstName, lastName, email, imageurl });
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Define a type for placeholders
  const placeholders: LinkInitialData[] = new Array(4).fill({
    url: "",
    isEmpty: true,
    type: "placeholder",
  }) as LinkInitialData[];

  const PreviewArray = [...initialData, ...placeholders].slice(0, 4);

  // Define image
  const typeToImageMap: ImageTypeMap = {
    Youtube: "/YoutubePre.png",
    Linkedin: "/LinkedInPre.png",
    Github: "/githubPre.png",
    Twitch: "/TwitchPre.png",
    Facebook: "/FacebookPre.png",
  };

  return (
    <div className="bg-preview-bg bg-[center_top_10px]  bg-no-repeat bg-auto w-[37%] hidden sm:hidden ro:block  ">
      <div className="flex justify-start flex-col items-center text-center w-[50%] mt-20 mx-auto">
        <div className="h-[110px] w-[110px] bg-Color10 rounded-full overflow-hidden">
          {nameEmail.imageurl && (
            <img
              className="h-[110px] w-[110px] object-cover object-center"
              src={nameEmail.imageurl}
              alt=""
            />
          )}
        </div>
        <p
          className={`mt-6 ${
            nameEmail.firstName && nameEmail.lastName
              ? ""
              : "bg-Color10 w-[160px] h-[16px]"
          } mb-3`}
        >
          {nameEmail.firstName && nameEmail.lastName
            ? `${nameEmail.firstName} ${nameEmail.lastName}`
            : ""}
        </p>

        <span className="font-normal text-sm text-Color4">
          {nameEmail.email}
        </span>
        <div className="mt-20">
          {PreviewArray.map((item, index) => (
            <div
              className="bg-Color10 rounded-lg w-[237px] h-[44px] mb-5 flex items-center justify-center"
              key={index}
            >
              {item.url && (
                <Image
                  src={typeToImageMap[item.type] || typeToImageMap.placeholder}
                  alt={item.type}
                  width={237}
                  height={44}
                  className="h-auto "
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
