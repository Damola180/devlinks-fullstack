"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";
import { handleGet } from "@/app/lib/functions";
import { useRouter } from "next/navigation";

function Navbar(props: { sessionUser: string }) {
  const pathname = usePathname();
  const userId = useRef();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGet();
        const { id } = data;
        userId.current = id;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <nav className="flex justify-between items-center  w-[100%] pt-4 px-6 pb-0   ">
        <div className="flex w-[14.8%] items-center gap-2">
          <Image
            src="/solar_link-circle-bold.png"
            width={26.67}
            height={26.67}
            alt="devlinks-img"
          />
          <Image
            src="/devlinks.png"
            width={108}
            height={21}
            alt="devlinks-img"
            quality={100}
          />
        </div>
        <div className=" flex justify-around w-[24.04%]">
          <Link
            href="/application"
            className={`flex items-center gap-2 hover:bg-vector-2 bg-no-repeat 
              bg-[center_left_15px] py-2 px-4 rounded-lg ${
                pathname === "/application"
                  ? "bg-vector-2 bg-Color6"
                  : "bg-unactive-link"
              }`}
          >
            <p
              className={`hover:text-Color1 ml-6   ${
                pathname === "/application" ? "text-Color1" : ""
              }`}
            >
              Links
            </p>
          </Link>

          <Link
            href="/application/profile"
            className={`flex items-center gap-2 hover:bg-vector-profile bg-no-repeat 
              bg-[center_left_5px] py-2 px-1 rounded-lg ${
                pathname === "/application/profile"
                  ? "bg-vector-profile bg-Color6"
                  : "bg-vector-3"
              }`}
          >
            <p
              className={`hover:text-Color1 ml-6   ${
                pathname === "/application/profile" ? "text-Color1" : ""
              }`}
            >
              {props.sessionUser}
            </p>
          </Link>
        </div>
        <div className=" w-[9%] text-center">
          <button
            onClick={() => router.replace(`/preview/${userId.current}`)}
            className="NavBtn "
          >
            Preview
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
