"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";
import { handleGet } from "@/app/lib/functions";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
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
    <div className="md:p-6 sm:py-3 sm:px-2 px-3  ">
      <nav className="flex justify-between md:justify-between sm:justify-normal sm:gap-4 items-center  w-[100%] pt-4 md:px-6 pb-0   ">
        <div className="flex md:w-[20.8%] w-[20%]  items-center md:gap-2 ">
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
            className="hidden md:block sm:block"
          />
        </div>
        <div className=" flex md:justify-center md:gap-3 sm:gap-0 gap-2 sm:w-[45%] md:w-[38%] w-[34%]  ">
          <Link
            href="/application"
            className={`flex items-center gap-2 hover:bg-vector-2 bg-no-repeat 
              md:bg-[center_left_15px] sm:bg-[center_left_15px] bg-[center] py-4  sm:px-4 md:px-4 px-7 rounded-lg ${
                pathname === "/application"
                  ? "bg-vector-2 bg-Color6"
                  : "bg-unactive-link"
              }`}
          >
            <p
              className={`hover:text-Color1  hidden md:block sm:block ml-6   ${
                pathname === "/application" ? "text-Color1" : ""
              }`}
            >
              Links
            </p>
          </Link>

          <Link
            href="/application/profile"
            className={`flex items-center gap-2 hover:bg-vector-profile bg-no-repeat 
               sm:bg-[center_left_15px]  md:bg-[center_left_15px] bg-[center]  py-4 sm:py-2 md:py-2 px-7 md:px-3 sm:px-3  rounded-lg 
                 ${
                   pathname === "/application/profile"
                     ? "bg-vector-profile bg-Color6"
                     : "bg-vector-3"
                 }`}
          >
            <p
              className={`hover:text-Color1 ml-6 hidden md:block sm:block  ${
                pathname === "/application/profile" ? "text-Color1" : ""
              }`}
            >
              {props.sessionUser}
            </p>
          </Link>
        </div>
        <button
          className="md:w-[10%]  sm:w-[9%] w-[19%] sm:text-sm text-sm md:text-base sm:ml-2"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
        <div className=" md:w-[12%] sm:w-[10%] w-[19%] text-center sm:ml-[-10px]  ">
          <button
            onClick={() => router.replace(`/preview/${userId.current}`)}
            className="NavBtn sm:py-3 py-4 px-7  bg-preview-eye bg-no-repeat bg-[center] sm:bg-none "
          >
            <span className="hidden sm:block ">Preview</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
