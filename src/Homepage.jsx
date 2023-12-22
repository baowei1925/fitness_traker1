import React from "react";
import Navy from "./navybar";
import Side from "./Side_info";
import Fit from "./fit";

function Home() {
  return (
    <div>
      <Navy className="bg-cyan-50 fixed top-0 w-full z-10" />
      <div className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-900 min-h-screen">
        <div className="flex flex-row items-start justify-center  bg-opacity-50 h-[55rem] w-[110rem] space-x-4 rounded-lg mt-4">
          <Side className="mt-4"></Side>
          <div className="w-[1rem]"></div>
          <Fit className="mt-[1rem]"></Fit>
        </div>
      </div>
    </div>
  );
}

export default Home;
