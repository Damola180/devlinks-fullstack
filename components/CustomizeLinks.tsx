"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Option } from "@/types";
import { useRouter } from "next/navigation";
import { handlePost, handleGet } from "@/app/lib/functions";
import {
  FacebookIcon,
  GithubIcon,
  TwitchIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "./linkIcons";

function CustomizeLinks() {
  // for each Link
  const options = [
    { value: "Github", label: "Github", imgSrc: <GithubIcon /> },
    { value: "Youtube", label: "YouTube", imgSrc: <YoutubeIcon /> },
    { value: "Facebook", label: "Facebook", imgSrc: <FacebookIcon /> },
    { value: "Twitch", label: "twitch", imgSrc: <TwitchIcon /> },
    { value: "Linkedin", label: "LinkedIn", imgSrc: <LinkedInIcon /> },
  ];
  const [addingFirstLink, setAddingFirstLink] = useState(false);
  const [linksContainers, setLinksContainers] = useState<Link[]>([]);
  const [isOpen, setIsOpen] = useState(
    Array(linksContainers.length).fill(false)
  );
  const [selectedOption, setSelectedOption] = useState(
    Array(linksContainers.length).fill(options[0])
  );

  console.log(selectedOption);
  console.log(isOpen);

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await handleGet();
      console.log(initialData);
      setLinksContainers(initialData);
      setSelectedOption(Array(linksContainers.length).fill(options[0]));
    };

    fetchData();
  }, []);

  const toggling = (index: number) => {
    const nextIsOpen = isOpen.map((isOpen, i) => {
      if (i === index) {
        return !isOpen;
      } else {
        return isOpen;
      }
    });
    setIsOpen(nextIsOpen);
  };

  const onOptionClicked = (index: number, indexOfOption: number) => () => {
    const nextSelectedOption = selectedOption.map((selectedOption, i) => {
      if (i === index) {
        return options[indexOfOption];
      } else {
        return selectedOption;
      }
    });
    setSelectedOption(nextSelectedOption);
    // mapping to off toggle
    const nextIsOpen = isOpen.map((isOpen, io) => {
      if (io === index) {
        return !isOpen;
      } else {
        return isOpen;
      }
    });
    setIsOpen(nextIsOpen);
  };

  // for form input
  const [inputValue, setInputValue] = useState<string[]>(
    Array(linksContainers.length).fill("")
  );
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newinputValue = inputValue.map((inputValue, io) => {
      if (io === index) {
        return event.target.value;
      } else {
        return inputValue;
      }
    });
    setInputValue(newinputValue);
  };

  function createLinks() {
    if (addingFirstLink == false) {
      setAddingFirstLink(true);
    }

    setLinksContainers((current) => [...current, {}]);

    setSelectedOption((current) => [...current, options[0]]);
    setIsOpen((isOpen) => [...isOpen, false]);
    setInputValue((inputValue) => [...inputValue, ""]);
  }

  function handleDataPost(selectedOption: Option[], inputValue: string[]) {
    for (let i = 0; i < selectedOption.length; i++) {
      console.log(selectedOption[i].value, inputValue[i]);
      try {
        handlePost(selectedOption[i].value, inputValue[i]);
        alert("links successful");
      } catch (error) {
        console.log(error);
      }
    }
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
                    <div key={index} className=" px-5 py-4 bg-Color8 relative ">
                      <div className="flex justify-between align-top mb-3 ">
                        <p className="font-semibold text-base text-bermuda mt-1">
                          = Link #{index + 1}
                        </p>
                        <span className="Body-M">Remove</span>
                      </div>

                      <div className="mb-3">
                        <p className="font-normal text-sm text-Color9 mb-1">
                          Platform
                        </p>
                        <div
                          onClick={() => toggling(index)}
                          className="flex justify-between items-center rounded-lg py-3 px-4 border border-Color2 hover:cursor-pointer hover:border-Color1 
          hover:shadow-custom"
                        >
                          <p className="flex items-center">
                            <span className="mr-3">
                              {selectedOption[index].imgSrc}
                            </span>

                            {selectedOption[index].value}
                          </p>

                          <Image
                            src={
                              isOpen[index]
                                ? "/linkArrUp.png"
                                : "/linkArrDown.png"
                            }
                            alt="toggle-img"
                            width={12}
                            height={6}
                            className="w-auto h-auto"
                          />
                        </div>
                        {isOpen[index] && (
                          <div className="bg-white rounded-lg border border-Color2 py-3 px-4 absolute top-36 left-5 w-[95.5%] z-10">
                            <div>
                              {options.map((option, i) => (
                                <div
                                  className={`flex gap-3 pb-3 pt-3 border-b-[1px] border-Color2
                                     hover:cursor-pointer ${
                                       selectedOption[index].value ===
                                       option.value
                                         ? "text-Color1 "
                                         : ""
                                     }`}
                                  onClick={onOptionClicked(index, i)}
                                  key={i}
                                >
                                  <div
                                    className={`flex items-center ${
                                      selectedOption[index].value ===
                                      option.value
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
                        <form action="">
                          <label
                            className="block font-normal text-sm text-Color9 mb-1"
                            htmlFor=""
                          >
                            Link
                          </label>
                          <input
                            value={inputValue[index]}
                            onChange={(e) => handleChange(e, index)}
                            className="w-[100%] py-3 pr-4 pl-9 bg-inlink bg-no-repeat  bg-[left_17.75px_top_18px]
            border 
            rounded-lg border-Color2
             font-medium text-base text-Color9 hover:cursor-pointer
               hover:border-Color1  hover:shadow-custom focus:shadow-custom focus:border caret-Color1 focus:border-Color1     focus:outline-none"
                            type="text"
                            placeholder="e.g. https://www.github.com/johnappleseed"
                          />
                        </form>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-right border-t-[1px] border-Color2 py-6">
                <button
                  onClick={() => handleDataPost(selectedOption, inputValue)}
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
