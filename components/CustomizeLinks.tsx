"use client";
import Image from "next/image";
import React from "react";
import { useState, useRef } from "react";
import LinkForm from "./LinkForm";
import { Link } from "@/types";
import { useRouter } from "next/navigation";

function CustomizeLinks() {
  const [addingFirstLink, setAddingFirstLink] = useState(false);
  const [linksContainers, setLinksContainers] = useState<Link[]>([]);
  // const [postToServer, setPostToServer] = useState(false);
  const postToServer = useRef(false);

  async function handleDataFromChild(selectedOption: string, link: string) {
    // setDataFromChild(data);

    try {
      const response = await fetch("/api/add-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: selectedOption, linkurl: link }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // setPostToServer(false);
    postToServer.current = false;
  }

  function createLinks() {
    if (addingFirstLink == false) {
      setAddingFirstLink(true);
    }

    setLinksContainers((current) => [...current, {}]);
  }
  return (
    <div className={` h-[834px]    px-10 w-[63%]`}>
      <div className="mb-7">
        <h1 className="Heading-M">Customize your links</h1>
        <p className="Body-M">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>

      <div>
        <button
          onClick={() => createLinks()}
          className="w-[100%] border rounded-lg border-Color1 py-2 px-6 font-medium text-base text-Color1 mb-2 hover:bg-Color6 hover:cursor-pointer"
        >
          + Add new link
        </button>
        <div>
          {addingFirstLink ? (
            <>
              <div className={linksContainers.length > 1 ? "mb-6" : "mb-40"}>
                {linksContainers.map((eachlink, index) => {
                  return (
                    <LinkForm
                      key={index}
                      Num={index}
                      pToServer={postToServer}
                      sendDataToParent={handleDataFromChild}
                    />
                  );
                })}
              </div>
              <div className="text-right border-t-[1px] border-Color2 py-6">
                <button
                  onClick={() => (postToServer.current = true)}
                  // onClick={() =>
                  //   handleDataFromChild("Facebook", "facebook.com")
                  // }
                  className={`rounded-lg  text-base
           text-Color2 font-medium py-3 px-6  bg-Color1`}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center bg-Color8 mb-24">
                <Image
                  alt="started"
                  src="/Group 273.svg"
                  width={249.53}
                  height={160}
                  className="mb-7 mx-auto"
                />
                <div>
                  <h3 className="font-semibold text-3xl mb-4">
                    Let’s get you started
                  </h3>
                  <p className="Body-M w-[65%] mx-auto">
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We’re
                    here to help you share your profiles with everyone!
                  </p>
                </div>
              </div>
              <div className="text-right border-t-[1px] border-Color2 py-6">
                <button
                  className={`rounded-lg  text-base text-Color2 font-medium py-3 px-6 
                    bg-Color7`}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomizeLinks;
