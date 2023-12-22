import React from "react";
import Navy from "./navybar";
import Graph_Line from "./Graph_Line";
import Graph2_Line2 from "./Graph_Line2";
function Line_com() {
  
  return (
      <div>
        <div className="h-[23rem] w-[70rem]"><Graph_Line></Graph_Line></div>
        <div className="h-[23rem] w-[70rem]"><Graph2_Line2></Graph2_Line2></div>
      </div>
  );
}

export default Line_com;
