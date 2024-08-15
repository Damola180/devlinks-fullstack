import Links from "@/components/Links";
import PreviewSection from "@/components/previewSection";
import Profile from "@/components/Profile";
import React from "react";

export default function profile() {
  return (
    <div className="p flex gap-12 ">
      <PreviewSection />

      <Profile />
    </div>
  );
}
