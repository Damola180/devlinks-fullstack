"use client";
import React, { useState, useEffect, useContext } from "react";
import { handleGet } from "@/app/lib/functions";
import { NameEmailTypeMap, nameEmailTypeMap } from "@/types";
import Image from "next/image";

export default function Profile() {
  // const { callData, validateData } = context;
  const [ChangesSaved, setChangeSaved] = useState("");

  const [nameEmail, setNameEmail] = useState<NameEmailTypeMap>({
    firstName: "",
    lastName: "",
    email: "",
    img: "",
    firstNameError: false,
    lastNameError: false,
  });

  async function fetchData() {
    const data = await handleGet();
    const { firstName, lastName, email, img } = data;

    setNameEmail({
      firstName,
      lastName,
      email,
      img,
      firstNameError: false,
      lastNameError: false,
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  function handleProfilePost(params: NameEmailTypeMap) {
    let { firstName, lastName, img, firstNameError, lastNameError } = params;
    if (firstName == "" || !firstName) {
      firstNameError = true;
      setNameEmail((prevState) => ({
        ...prevState,
        firstNameError: true,
      }));
    }
    if (lastName == "" || !lastName) {
      lastNameError = true;
      setNameEmail((prevState) => ({
        ...prevState,
        lastNameError: true,
      }));
    }
    if (firstNameError == false && lastNameError == false) {
      console.log(firstNameError, lastNameError);
      console.log("crackinhg");
    }
  }
  return (
    <div className="py-3 px-10 w-[80%]">
      <div className="mb-4">
        <h1 className="font-bold text-3xl py-1 mb-2">Profile Details</h1>
        <p className="Body-M">
          Add your details to create a personal touch to your profile.
        </p>
      </div>

      <div className="py-5 px-7 mb-7 bg-Color8">
        <div className="flex  items-center ">
          <p className="Body-M w-[45%]">Profile picture</p>
          {nameEmail.img ? (
            <div></div>
          ) : (
            <div className="flex items-center gap-10">
              <div className="rounded-xl bg-Color6 w-[193px] h-[193px]">
                <p className="pt-[67.25px] text-center">
                  <Image
                    src="/nonimg.png"
                    width={32.5}
                    height={27.5}
                    alt="img"
                    className="block m-auto"
                  />
                  <span>+ Upload image</span>
                </p>
              </div>
              <p className="Body-S w-[40%]">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="px-7 bg-Color8 ">
        <form action="">
          <div className="flex items-center mb-3 relative">
            <label className="w-[43%] Body-M" htmlFor="">
              First name*
            </label>
            <input
              className={`px-4 py-3 bg-white rounded-lg border border-Color2 w-[57%]
               font-medium text-base text-Color9  hover:cursor-pointer
               hover:border-Color1  hover:shadow-custom focus:shadow-custom focus:border caret-Color1 focus:border-Color1     focus:outline-none 
               ${
                 nameEmail.firstNameError
                   ? "border-Color5 text-Color5 "
                   : "border-Color2 text-Color9"
               } `}
              type="text"
              placeholder="e.g. John"
              value={nameEmail?.firstName || ""}
              onChange={(e) =>
                setNameEmail({
                  ...nameEmail,
                  firstName: e.target.value,
                  firstNameError: false,
                })
              }
            />
            <span className="text-Color5 Body-S absolute right-[6px]">
              {nameEmail.lastNameError ? "Can’t be empty" : ""}
            </span>
          </div>
          <div className="flex items-center mb-3 relative">
            <label className="w-[43%] Body-M" htmlFor="">
              Last name*
            </label>
            <input
              className={`px-4 py-3 bg-white rounded-lg border border-Color2 w-[57%]
               font-medium text-base text-Color9  hover:cursor-pointer
               hover:border-Color1  hover:shadow-custom focus:shadow-custom focus:border caret-Color1 focus:border-Color1     focus:outline-none 
               ${
                 nameEmail.lastNameError
                   ? "border-Color5 text-Color5 "
                   : "border-Color2 text-Color9"
               } `}
              type="text"
              value={nameEmail?.lastName || ""}
              onChange={(e) =>
                setNameEmail({
                  ...nameEmail,
                  lastName: e.target.value,
                  lastNameError: false,
                })
              }
              placeholder="e.g. Appleseed"
            />
            <span className="text-Color5 Body-S absolute right-[6px]">
              {nameEmail.lastNameError ? "Can’t be empty" : ""}
            </span>
          </div>
          <div className="flex items-center mb-3">
            <label className="w-[43%] Body-M" htmlFor="">
              Email*
            </label>
            <input
              className="px-4 py-3 bg-white rounded-lg border border-Color2 w-[57%]
               font-medium text-base text-Color9  hover:cursor-pointer
              "
              type="text"
              placeholder={nameEmail.email}
              value={nameEmail.email}
              disabled
            />
          </div>
        </form>
      </div>
      <div
        className={`text-right border-t-[1px] border-Color2 py-3
          mt-16`}
      >
        <button
          onClick={() => handleProfilePost(nameEmail)}
          className={`rounded-lg  text-base
           text-Color2 font-medium py-3 px-6  bg-Color1`}
        >
          Save
        </button>
      </div>
      {ChangesSaved !== "" && (
        <p
          className="flex items-center gap-3 px-6 w-[400px] h-[56px]
                 text-Color8 text-base border rounded-xl bg-Color9 relative bottom-20 
                 right-16 "
        >
          <span>
            <Image src="/savedPng.png" alt="savepng" width={15} height={15} />
          </span>
          {ChangesSaved}
        </p>
      )}
    </div>
  );
}
