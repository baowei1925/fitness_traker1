import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import Navy from "./navybar";
import Bar_com from "./Bar_com";
import Bar_com_mon from "./Bar_com_mon";
import Line_com_mon from "./Line_com_mon";
import Line_com from "./Line_com";
import { RadioGroup, Radio } from "@nextui-org/react";

function History() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("Week");

  function handlePeriodChange(value) {
    setSelectedPeriod(value);
  }

  function jump1() {
    navigate(`/History/${selectedPeriod.toLowerCase()}`);
  }

  function jump2() {
    navigate(`/History/Bar_${selectedPeriod.toLowerCase()}`);
  }

  return (
    <div>
      <Navy className="bg-cyan-500" />
      <div className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-900 min-h-screen">
        <div className="flex items-center bg-slate-50 bg-opacity-80 h-[50rem] w-[90rem] rounded-lg mt-[3rem]">

          {/* Group the RadioGroup and buttons in a div on the left */}
          <div className="flex flex-col items-center w-1/4 p-8">
            <RadioGroup
              label="Select"
              orientation="horizontal"
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
            >
              <Radio value="Week" defaultChecked>Week</Radio>
              <Radio value="Month">Month</Radio>
            </RadioGroup>

            <Button onClick={jump1} className="w-36 h-12 rounded-full bg-blue-500 text-white mt-4">Line</Button>
            <Button onClick={jump2} className="w-36 h-12 rounded-full bg-blue-500 text-white mt-4">Bar</Button>
          </div>

          {/* Display the graph on the right */}
          <div className="w-3/4">
            <Routes>
              <Route path="/week" element={<Line_com />} />
              <Route path="/" element={<Line_com />} />
              <Route path="/Bar_week" element={<Bar_com />} />
              <Route path="/month" element={<Line_com_mon />} />
              <Route path="/Bar_month" element={<Bar_com_mon />} />
            </Routes>
          </div>

        </div>
      </div>
    </div>
  );
}

export default History;
