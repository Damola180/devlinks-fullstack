"use client";
import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import {
  handlePost,
  handleGet,
  handlePATCH,
  handleDELETE,
} from "@/app/lib/functions";
import { Link, LinkInitialData } from "@/types";
import {
  FacebookIcon,
  GithubIcon,
  TwitchIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "./linkIcons";
import { ColorRing } from "react-loader-spinner";
import { useGetReqContext } from "./ContextProvider";

export default function Links() {
  const context = useGetReqContext();
  if (!context) {
    throw new Error("Preview");
  }
  const { validateData } = context;
  const router = useRouter();
  setTimeout(() => {
    setChangeSaved("");
  }, 2800);
  // code to check if url is valid
  function isValidURL(url: string) {
    var res = url.match(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    );
    return res !== null;
  }
  // code to check if type is include in url (like //github.com/Damola180.includes(github))
  function isStringInURL(url: string, type: string) {
    return url.includes(type.toLowerCase());
  }

  const options = [
    { value: "Github", label: "Github", imgSrc: <GithubIcon /> },
    { value: "Youtube", label: "YouTube", imgSrc: <YoutubeIcon /> },
    { value: "Facebook", label: "Facebook", imgSrc: <FacebookIcon /> },
    { value: "Twitch", label: "twitch", imgSrc: <TwitchIcon /> },
    { value: "Linkedin", label: "LinkedIn", imgSrc: <LinkedInIcon /> },
  ];
  const [linksContainers, setLinksContainers] = useState<Link[]>([]);
  const [spinner, setSpinner] = useState(true);
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const ErrorInPost = useRef("");
  const [ChangesSaved, setChangeSaved] = useState("");

  const toggleOpen = (category: string) => {
    setIsOpen({
      ...isOpen,
      [category]: !isOpen[category],
    });
  };

  const fetchData = async () => {
    setSpinner(true);

    try {
      let initialData = await handleGet();
      initialData = initialData.userLinks.map((item: LinkInitialData) => ({
        ...item,
        clientId: item.clientId || uuidv4(),
        isEmpty: true,
        isValidURL: true,
      }));

      setLinksContainers(initialData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // fns for option already chose
  function selectedOption(eachlinkType: string) {
    const theOption = options.filter((option) => option.value === eachlinkType);

    return theOption[0].imgSrc;
  }
  //  fns for new option chose
  const onOptionClicked = (clientId: string, indexOfOption: number) => () => {
    const nextSelectedOption = linksContainers.map((linkContain, i) => {
      if (linkContain.clientId === clientId) {
        return {
          ...linkContain,
          type: options[indexOfOption].value,
          isEmpty: true,
          isValidURL: true,
        };
      } else {
        return linkContain;
      }
    });

    setLinksContainers(nextSelectedOption);

    // mapping to off toggle
    setIsOpen({
      ...isOpen,
      [clientId]: !isOpen[clientId],
    });
  };

  // handlechange for the form
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    clientId: string
  ) {
    const inputValueUpdated = linksContainers.map((linkContain, i) => {
      if (linkContain.clientId === clientId) {
        return {
          ...linkContain,
          url: event.target.value,
          isEmpty: true,
          isValidURL: true,
        };
      } else {
        return linkContain;
      }
    });

    setLinksContainers(inputValueUpdated);
  }

  // to create new link
  function createLinks() {
    const newLink = {
      type: options[0].value,
      url: "",
      clientId: uuidv4(),
      isEmpty: true,
      isValidURL: true,
    };

    setLinksContainers((prevLinksContainers) => [
      ...prevLinksContainers,
      newLink,
    ]);
  }

  // to POST request the links and the newly created ones

  async function handleDataPost(params: Link[]) {
    // Create a copy of the state

    // Validate URLs and Types
    const updatedLinks = linksContainers.map((linkContain, i) => {
      if (!linkContain.url || linkContain.url === "") {
        return {
          ...linkContain,

          isEmpty: false,
        };
      }
      if (
        !isValidURL(linkContain.url) ||
        !isStringInURL(linkContain.url, linkContain.type)
      ) {
        return {
          ...linkContain,

          isValidURL: false,
        };
      } else {
        return { ...linkContain };
      }
    });

    setLinksContainers(updatedLinks);

    const allValidAndNotEmpty = updatedLinks.every(
      (link) => link.isEmpty === true && link.isValidURL === true
    );

    if (allValidAndNotEmpty) {
      setSpinner(true);

      try {
        for (let i = 0; i < linksContainers.length; i++) {
          if (updatedLinks[i].id) {
            await handlePATCH(
              updatedLinks[i].id,
              updatedLinks[i].type,
              updatedLinks[i].url
            );
          } else {
            await handlePost(updatedLinks[i].type, updatedLinks[i].url);
          }
        }

        ErrorInPost.current = "";
        validateData();
        fetchData();
        setChangeSaved("Your changes have been successfully saved!");
      } catch (error) {
        console.log("Error in processing links:", error); // Log the error
        ErrorInPost.current = "Unable to perform request try again";
      } finally {
        setSpinner(false);
      }
    }
  }

  // to Remove link

  async function RemoveLink(clientId: string, id: number | undefined) {
    if (id) {
      setSpinner(true);
      try {
        await handleDELETE(id);
      } catch (error) {
        console.error("Error in deleting data:", error);
      }
      setLinksContainers((prevLinksContainers) =>
        prevLinksContainers.filter((link) => link.id !== id || !link.id)
      );
      setSpinner(false);
    } else {
      setLinksContainers((prevLinksContainers) =>
        prevLinksContainers.filter((link) => link.clientId !== clientId)
      );
    }
  }

  function validationErrormsg(isEmpty: boolean, isValidURL: boolean) {
    if (!isEmpty) {
      return "Cant be empty";
    }
    if (!isValidURL) {
      return "invalid url pls check";
    }
  }

  return (
    <div className={` h-[834px]  px-10 w-[63%]`}>
      <div className="mb-7">
        <h1 className="Heading-M">Customize your links</h1>
        <p className="Body-M">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>
      <button
        onClick={() => createLinks()}
        className="w-[100%] border rounded-lg border-Color1 py-2 px-6 font-medium text-base text-Color1 mb-1 hover:bg-Color6 hover:cursor-pointer"
      >
        + Add new link
      </button>
      <div>
        {spinner ? (
          <div className="flex justify-center items-center h-[270px]">
            <ColorRing
              visible={true}
              height="185"
              width="200"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#BEADFF", "#BEADFF", "#BEADFF", "#BEADFF", "#BEADFF"]}
            />
          </div>
        ) : (
          <>
            {linksContainers.length > 0 ? (
              <div>
                {linksContainers.map((eachlink, index) => (
                  <div key={index} className="px-5 pt-2 bg-Color8 relative ">
                    <div className="flex justify-between align-top mb-3">
                      <p className="font-semibold text-base text-bermuda mt-1">
                        Link #{index + 1}
                      </p>
                      <span
                        onClick={() =>
                          RemoveLink(eachlink.clientId, eachlink.id)
                        }
                        className="Body-M hover:cursor-pointer"
                      >
                        Remove
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="font-normal text-sm text-Color9 mb-1">
                        Platform
                      </p>
                      <div
                        className="flex justify-between items-center rounded-lg py-3 px-4 border border-Color2 hover:cursor-pointer hover:border-Color1 
          hover:shadow-custom"
                        onClick={() => {
                          toggleOpen(eachlink.clientId);
                        }}
                      >
                        <p className="flex items-center">
                          <span key={index} className="mr-3">
                            {selectedOption(eachlink.type)}
                          </span>
                          {eachlink.type}
                        </p>

                        <Image
                          src={
                            isOpen[eachlink.clientId]
                              ? "/linkArrUp.png"
                              : "/linkArrDown.png"
                          }
                          alt="toggle-img"
                          width={12}
                          height={6}
                          className="w-auto h-auto"
                        />
                      </div>

                      {isOpen[eachlink.clientId] && (
                        <div
                          className="bg-white rounded-lg border border-Color2 py-3 px-4 absolute 
                      top-36 left-5 w-[95.5%] z-10"
                        >
                          <div>
                            {options.map((option, i) => (
                              <div
                                className={`flex gap-3 pb-3 pt-3 border-b-[1px] border-Color2
                                       hover:cursor-pointer ${
                                         eachlink.type === option.value
                                           ? "text-Color1 "
                                           : ""
                                       }`}
                                onClick={onOptionClicked(eachlink.clientId, i)}
                                key={i}
                              >
                                <div
                                  className={`flex items-center ${
                                    eachlink.type === option.value
                                      ? "fill-Color1 "
                                      : ""
                                  }`}
                                >
                                  <div>{option.imgSrc}</div>
                                </div>

                                <p> {option.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <form action="" className="relative">
                        <label
                          className="block font-normal text-sm text-Color9 mb-1"
                          htmlFor=""
                        >
                          Link
                        </label>
                        <input
                          value={eachlink.url}
                          onChange={(e) => handleChange(e, eachlink.clientId)}
                          className={`w-[100%] py-3 pr-4 pl-9 bg-inlink bg-no-repeat  bg-[left_17.75px_top_18px]       border  rounded-lg   ${
                            !eachlink.isEmpty || !eachlink.isValidURL
                              ? "border-Color5 text-Color5 "
                              : "border-Color2 text-Color9"
                          }  
             font-medium text-base  hover:cursor-pointer
               hover:border-Color1  hover:shadow-custom focus:shadow-custom focus:border caret-Color1 focus:border-Color1     focus:outline-none`}
                          type="text"
                          placeholder="e.g. https://www.github.com/johnappleseed"
                        />
                        <p className="Body-S text-Color5 absolute top-10 right-6">
                          {validationErrormsg(
                            eachlink.isEmpty,
                            eachlink.isValidURL
                          )}
                        </p>
                      </form>
                    </div>
                  </div>
                ))}

                <div className="text-Color5">{ErrorInPost.current}</div>
                <div
                  className={`text-right border-t-[1px] border-Color2 py-3 ${
                    linksContainers.length > 1 ? "mt-6" : "mt-40"
                  }`}
                >
                  <button
                    onClick={() => handleDataPost(linksContainers)}
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
                      <Image
                        src="/savedPng.png"
                        alt="savepng"
                        width={15}
                        height={15}
                      />
                    </span>
                    {ChangesSaved}
                  </p>
                )}
              </div>
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
                      Use the “Add new link” button to get started. Once you
                      have more than one link, you can reorder and edit them.
                      We’re here to help you share your profiles with everyone!
                    </p>
                  </div>
                </div>
                <div className="text-right border-t-[1px] border-Color2 py-6">
                  <button className="rounded-lg text-base text-Color2 font-medium py-3 px-6 bg-Color7">
                    Save
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
