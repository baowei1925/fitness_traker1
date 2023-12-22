import React from "react";
import Navy from "./navybar";
import Side_diet from "./side_of_diet";
import Diet_item from "./Diet";
import { useState ,  } from "react";

function Diet() {
  
  return (
    <div>
    <Navy className="bg-cyan-50"/>
    <div className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-900 min-h-screen">
    <div className="flex flex-row items-start justify-center  bg-opacity-50 h-[55rem] w-[110rem] space-x-4 rounded-lg mt-4">
      <Side_diet className="mt-4"></Side_diet>
      <div className="w-[1rem]"></div>
      <Diet_item className="mt-[1rem]"></Diet_item>
      </div>
      </div>
  </div>
  );
}

export default Diet;
