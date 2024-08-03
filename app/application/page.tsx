import React from "react";
import PreviewSection from "@/components/previewSection";
import CustomizeLinks from "@/components/CustomizeLinks";

function application() {
  return (
    <div className="p-6 pt-0 flex gap-6 ">
      <PreviewSection />
      <CustomizeLinks />
    </div>
  );
}

export default application;
