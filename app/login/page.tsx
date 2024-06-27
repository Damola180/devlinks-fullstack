"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function page() {
  // states, refs and so on
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  // ref for button style
  const buttonRef = useRef<HTMLButtonElement>(null);

  // restructure the formData state
  const { email, password } = formData;

  // onChange of input fields

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "email") {
      setEmailErrorMsg("");
    } else {
      setPasswordErrorMsg("");
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevents the default form submission

    console.log(email);
    console.log(password);

    if (email === "") {
      setEmailErrorMsg("Cant be empty");
    }
    if (password === "") {
      setPasswordErrorMsg("Cant be empty");
    }
  }

  // Ref for the styling of button on click

  function handleClick() {
    const btn = buttonRef.current;
    if (btn) {
      btn.classList.add("scale-95");
      setTimeout(() => {
        if (btn) {
          btn.classList.remove("scale-95");
        }
      }, 200);
    }
  }
  return (
    <div className=" flex justify-center items-center h-[750px] flex-col ">
      <div className="sm:w-[85%] md:w-[50%]  ">
        <div className="flex sm:justify-center items-center mb-[35px]  ml-9 sm:ml-0  ">
          <Image
            src="/solar_link-circle-bold.png"
            width={33.33}
            height={33.33}
            alt="devlinks-img"
          />
          <Image
            src="/devlinks.png"
            width={135}
            height={26.25}
            alt="devlinks-img"
            quality={100}
            className=" ml-[3px]"
          />
        </div>
        <div className="frame-259">
          <div className="frame-246">
            <h1 className="Heading-M"> Login</h1>
            <p className="Body-M ">
              Add your details below to get back into the app
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            action="submit"
            className="frame-238"
            noValidate
          >
            <div className="mb-5 relative">
              <label
                className={`Body-S ${
                  emailErrorMsg ? "frame380-label-Error" : "frame380-label"
                }`}
              >
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className={`bg-[url('/ph_envelope-simple-fill.svg')] ${
                  emailErrorMsg ? "frame380-input-Error" : "frame380-input"
                }`}
                placeholder="e.g. alex@email.com"
                required
              />
              <p className="input-msg">{emailErrorMsg}</p>
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor=""
                className={`Body-S ${
                  passwordErrorMsg ? "frame380-label-Error" : "frame380-label"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={handleChange}
                className={`bg-[url('/ph_lock-key-fill.svg')] ${
                  passwordErrorMsg ? "frame380-input-Error" : "frame380-input"
                }`}
                name="password"
                placeholder="Enter your password"
                required
              />
              <p className="input-msg">{passwordErrorMsg}</p>
            </div>
            <div className="flex justify-start">
              <button
                ref={buttonRef}
                onClick={handleClick}
                className="Acc-btn "
                type="submit"
              >
                Login
              </button>
            </div>

            <div className="form-note">
              <p className="Body-M">
                Don’t have an account?
                <Link href="/signup">
                  <span className="text-Color1 cursor-pointer ml-1">
                    Create account
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
