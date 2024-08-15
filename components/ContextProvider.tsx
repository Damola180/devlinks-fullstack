"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ReqContextType } from "@/types";

// Create the context with an initial value of undefined
const GetReqContext = createContext<ReqContextType | undefined>(undefined);

// Create a provider component
function GetReqProvider({ children }: { children: React.ReactNode }) {
  const [callData, setCallData] = useState(false);

  const validateData = () => {
    setCallData((prevCallData) => !prevCallData);
  };

  return (
    <GetReqContext.Provider value={{ callData, validateData }}>
      {children}
    </GetReqContext.Provider>
  );
}

// Custom hook to use the context
function useGetReqContext() {
  const context = useContext(GetReqContext);
  if (context === undefined) {
    throw new Error("useGetReqContext must be used within a GetReqProvider");
  }
  return context;
}

export { GetReqProvider, useGetReqContext };
