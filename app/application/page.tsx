"use client";
import React, { useContext, createContext, useState } from "react";
import { Suspense } from "react";
import PreviewSection from "@/components/previewSection";
import Links from "@/components/Links";

function Application() {
  return (
    <div className="p flex  ">
      <PreviewSection />
      <Suspense fallback={"Loading..."}>
        <Links />
      </Suspense>
    </div>
  );
}

export default Application;
