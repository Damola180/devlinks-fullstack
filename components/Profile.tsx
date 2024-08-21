"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { handleGet } from "@/app/lib/functions";
import { NameEmailTypeMap, nameEmailTypeMap } from "@/types";
import Image from "next/image";
import { imageToPrisma } from "@/app/lib/postImage";
import { profileUPDATE } from "@/app/lib/profileUpdate";

export default function Profile() {
  // const { callData, validateData } = context;
  const [loadingImg, setloadingImg] = useState(false);

  const [nameEmail, setNameEmail] = useState<NameEmailTypeMap>({
    firstName: "",
    lastName: "",
    email: "",
    imageurl: "",
    firstNameError: false,
    lastNameError: false,
  });

  async function fetchData() {
    const data = await handleGet();
    const { firstName, lastName, email, imageurl } = data;

    setNameEmail({
      firstName,
      lastName,
      email,
      imageurl,
      firstNameError: false,
      lastNameError: false,
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  function handleProfilePost(params: NameEmailTypeMap) {
    let { firstName, lastName, imageurl, firstNameError, lastNameError } =
      params;
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

      profileUPDATE(firstName, lastName);
      // Force refresh the page
      window.location.reload();
    }
  }

  // upload Image
  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    setloadingImg(true);
    let file = e.target.files?.[0];

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string
      );

      try {
        const res = await fetch(`/api/cloudload`, {
          method: "POST",
          body: data,
        });

        const imageResponse = await res.json();

        if (res.ok) {
          const imageUrl = imageResponse.uploadedImageData.secure_url;
          if (nameEmail.imageurl !== "") {
            // Update the existing image and delete the old one in cloudinary
            imageToPrisma(imageUrl, "PATCH")
              .then(() => deleteImage(nameEmail.imageurl))
              .then(() => console.log("Old image deleted successfully"))
              .then(() => fetchData())
              .catch((error) =>
                console.error(
                  "Error updating image and deleting old one:",
                  error
                )
              );
            setTimeout(() => {
              setloadingImg(false);
            }, 1500);
          } else {
            // POST: Save the new image
            imageToPrisma(imageUrl, "POST")
              .then(() => console.log("Image uploaded successfully"))
              .then(() => fetchData())

              .catch((error) =>
                console.error("Error saving new image:", error)
              );
            setloadingImg(false);
          }
        } else {
          console.error("Error uploading image:", imageResponse);
          setloadingImg(false);
        }
      } catch (error) {
        console.error("An error occurred while uploading the image:", error);
        setloadingImg(false);
      }
    } else {
      console.log("No file selected");
      setloadingImg(false);
    }
  }

  //  delete Image

  async function deleteImage(url: string) {
    try {
      const res = await fetch(`/api/clouddelete/?url=${url}`, {
        method: "DELETE",
      });
      const deletedImageData = await res.json();
      if (deletedImageData.status === 200) {
        console.log("delete image in cloudinary is working");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="sm:py-3 py-4 sm:px-10 px-6 ro:w-[63%] w-[100%]">
      <div className="mb-4">
        <h1 className="font-bold sm:text-3xl text-2xl py-1 mb-2">
          Profile Details
        </h1>
        <p className="Body-M">
          Add your details to create a personal touch to your profile.
        </p>
      </div>

      <div className="py-5 px-7 mb-7 bg-Color8">
        <div className="sm:flex   items-center ">
          <p className="Body-M w-[45%] mb-4 sm:mb-0">Profile picture</p>

          {loadingImg ? (
            <p>loading... img </p>
          ) : (
            <>
              {nameEmail.imageurl ? (
                <div className="sm:flex items-center gap-10">
                  <div className="relative w-[193px] h-[193px]   rounded-xl text-center flex items-center  bg-Color9 opacity-95">
                    <input
                      type="file"
                      className=" absolute opacity-0 z-20 top-0 left-0 w-full h-full  cursor-pointer mb-4"
                      name="upload-image"
                      id="upload-image"
                      accept="image/png, image/jpeg"
                      onChange={uploadImage}
                    />
                    <img
                      src={nameEmail.imageurl}
                      alt="img"
                      className="block m-auto h-full w-full absolute top-0 left-0 z-0 rounded-md opacity-85 object-cover "
                    />

                    <div className=" m-auto cursor-pointer z-10">
                      <Image
                        src="/profileimg.png"
                        width={32.5}
                        height={6}
                        alt="img"
                        className="block m-auto "
                      />
                      <span className=" text-center Heading-S text-white">
                        Change image
                      </span>
                    </div>
                  </div>

                  <p className="Body-S sm:w-[40%] mt-6 sm:mt-0">
                    Image must be below 1024x1024px. Use PNG or JPG format.
                  </p>
                </div>
              ) : (
                <div className="sm:flex items-center gap-10">
                  <div className="relative w-[193px] h-[193px] bg-Color6 rounded-xl text-center flex items-center">
                    <input
                      type="file"
                      className="absolute opacity-0 z-40 top-0 left-0 w-full h-full  cursor-pointer"
                      name="upload-image"
                      id="upload-image"
                      accept="image/png, image/jpeg"
                      onChange={uploadImage}
                    />

                    <div className=" m-auto cursor-pointer">
                      <Image
                        src="/nonimg.png"
                        width={32.5}
                        height={6}
                        alt="img"
                        className="block m-auto "
                      />
                      <span className=" text-center ">+ Upload image</span>
                    </div>
                  </div>

                  <p className="Body-S sm:w-[40%] mt-6 sm:mt-0">
                    Image must be below 1024x1024px. Use PNG or JPG format.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="px-7 bg-Color8 ">
        <form action="">
          <div className="sm:flex items-center mb-3 relative">
            <label className="w-[43%] Body-M block" htmlFor="">
              First name*
            </label>
            <input
              className={`px-4 py-3 bg-white rounded-lg border border-Color2 sm:w-[57%] w-[100%]
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
              {nameEmail.firstNameError ? "Can’t be empty" : ""}
            </span>
          </div>
          <div className="sm:flex items-center mb-3 relative">
            <label className="w-[43%] Body-M block" htmlFor="">
              Last name*
            </label>
            <input
              className={`px-4 py-3 bg-white rounded-lg border border-Color2 sm:w-[57%] w-[100%]
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
          <div className="sm:flex items-center mb-3 ">
            <label className="w-[43%] Body-M block " htmlFor="">
              Email*
            </label>
            <input
              className="px-4 py-3 bg-white rounded-lg border border-Color2 sm:w-[57%] w-[100%]
               font-medium text-base text-Color9 cursor-not-allowed
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
          className={`rounded-lg  text-base sm:w-auto w-[100%]
           text-Color2 font-medium py-3 px-6  bg-Color1`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
