"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { schemaCreate } from "@/types";
import { useRouter } from "next/navigation";
import { MdDangerous } from "react-icons/md";

type FormFields = z.infer<typeof schemaCreate>;

function page() {
  // states, refs and so on
  const router = useRouter();

  // ref for button style
  const buttonRef = useRef<HTMLButtonElement>(null);

  // destructure use form hook
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schemaCreate) });
  // onSubmit form function

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        // Check if the response is not ok (status code is not 2xx)
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const responseData = await response.json();

      if (responseData) {
        router.replace("/");
      }
      return "signup done";
    } catch (error: any) {
      console.log(error);

      setError("serverError", {
        type: "server",
        message: error.message,
      });
      return "signup done";
    }
  };

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
      <div className="sm:w-[85%] md:w-[80%] lg:w-[50%] ">
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
            <h1 className="Heading-M"> Create account</h1>
            <p className="Body-M ">Let’s get you started sharing your links!</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="frame-238"
            noValidate
          >
            <div className="mb-5 relative">
              <label
                className={`Body-S ${
                  errors.email ? "frame380-label-Error" : "frame380-label"
                }`}
              >
                Email address
              </label>

              <input
                type="email"
                className={`bg-[url('/ph_envelope-simple-fill.svg')] ${
                  errors.email ? "frame380-input-Error" : "frame380-input"
                }`}
                placeholder="e.g. alex@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="input-msg">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-5 relative">
              <label
                className={`Body-S ${
                  errors.password ? "frame380-label-Error" : "frame380-label"
                }`}
              >
                Create password
              </label>
              <input
                type="password"
                className={`bg-[url('/ph_lock-key-fill.svg')] ${
                  errors.password ? "frame380-input-Error" : "frame380-input"
                }`}
                placeholder="At least 8 characters"
                {...register("password")}
              />
              {errors.password && (
                <p className="input-msg">{errors.password.message}</p>
              )}
            </div>
            <div className="mb-5 relative">
              <label htmlFor="" className="Body-S frame380-label ">
                Confirm password
              </label>
              <input
                type="password"
                className={`bg-[url('/ph_lock-key-fill.svg')] ${
                  errors.confirmPassword
                    ? "frame380-input-Error"
                    : "frame380-input"
                }`}
                placeholder="At least 8 characters"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="input-msg">{errors.confirmPassword.message}</p>
              )}
            </div>

            {errors.serverError?.message && (
              <div className="text-Color5 mb-6  flex justify-center items-center align-center ">
                <MdDangerous className="text-Color5 " size={24} />
                <p> {errors.serverError.message}</p>
              </div>
            )}

            <div className="flex justify-start">
              <button
                disabled={isSubmitting}
                ref={buttonRef}
                onClick={handleClick}
                className="Acc-btn "
                type="submit"
              >
                {isSubmitting ? "loading..." : "Create Account"}
              </button>
            </div>

            <div className="form-note">
              <p className="Body-M">
                Already have an account?
                <Link href="/login">
                  <span className="text-Color1 cursor-pointer ml-1">Login</span>
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
