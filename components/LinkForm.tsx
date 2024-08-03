"useclient";
import React, { useState } from "react";
import { MyLinkform } from "@/types";
import Image from "next/image";
import {
  FacebookIcon,
  GithubIcon,
  TwitchIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "./linkIcons";

function LinkForm({ Num, pToServer, sendDataToParent }: MyLinkform) {
  // for dropdown menu
  const options = [
    { value: "Github", label: "Github", imgSrc: <GithubIcon /> },
    { value: "Youtube", label: "YouTube", imgSrc: <YoutubeIcon /> },
    { value: "Facebook", label: "Facebook", imgSrc: <FacebookIcon /> },
    { value: "Twitch", label: "twitch", imgSrc: <TwitchIcon /> },
    { value: "Linkedin", label: "LinkedIn", imgSrc: <LinkedInIcon /> },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (index: number) => () => {
    setSelectedOption(options[index]);
    setIsOpen(false);
  };

  // for form input
  const [inputValue, setInputValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // for server purpose

  if ((pToServer.current = true)) {
    console.log("i ran");
    sendDataToParent(selectedOption.value, inputValue);
  }

  return (
    <div className=" px-5 py-4 bg-Color8 relative ">
      <div className="flex justify-between align-top mb-3 ">
        <p className="font-semibold text-base text-bermuda mt-1">
          = Link #{Num + 1}
        </p>
        <span className="Body-M">Remove</span>
      </div>

      <div className="mb-3">
        <p className="font-normal text-sm text-Color9 mb-1">Platform</p>
        <div
          onClick={toggling}
          className="flex justify-between items-center rounded-lg py-3 px-4 border border-Color2 hover:cursor-pointer hover:border-Color1 
          hover:shadow-custom"
        >
          <p className="flex items-center">
            <span className="mr-3"> {selectedOption.imgSrc}</span>

            {selectedOption.value}
          </p>

          <Image
            src={isOpen ? "/linkArrUp.png" : "/linkArrDown.png"}
            alt="toggle-img"
            width={12}
            height={6}
            className="w-auto h-auto"
          />
        </div>
        {isOpen && (
          <div className="bg-white rounded-lg border border-Color2 py-3 px-4 absolute top-36 left-5 w-[95.5%] z-10">
            <div>
              {options.map((option, index) => (
                <div
                  className={`flex gap-3 pb-3 pt-3 border-b-[1px] border-Color2 hover:cursor-pointer ${
                    selectedOption.value === option.value ? "text-Color1 " : ""
                  }`}
                  onClick={onOptionClicked(index)}
                  key={index}
                >
                  <div
                    className={`flex items-center ${
                      selectedOption.value === option.value
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
            value={inputValue}
            onChange={handleChange}
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
}

export default LinkForm;
