import React, { useState, useEffect, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import Weather from "./Weather";
import Circular_p from "./Circular_p";
import Circular_F from "./Circular_F";

function Fit() {
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showWeather, setShowWeather] = useState(false);
  const rowsPerPage = 5;
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        //const dateCal = "2023-12-19T00:00:00.000+00:00";
        const dateCal = `${year}-${month}-${date}T00:00:00.000+00:00`;
        const response = await fetch(
          `http://localhost:5050/users/total-cal/${userId}/2/${dateCal}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }

        const userData = await response.json();
        setRows(userData);
        setError(null);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        setError("Error fetching user data. Please try again later.");
      }
    };

    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    fetchData();

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []); // The dependency array is empty, so this useEffect runs once on component mount

  const handleCheckWeather = () => {
    setShowWeather(!showWeather); // Toggle the visibility
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const start = (page - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, rows.length);
  const items = useMemo(() => {
    return rows.slice(start, end);
  }, [rows, start, end]);

  return (
    <div className="bg-gradient-to-l from-blue-900 to-blue-500 h-[48rem] w-[60rem] flex flex-col items-start justify-start rounded-lg gap-8 p-4 relative mt-[4rem]">
      <div className="text-white text-2xl absolute top-4 right-8">
        {currentDateTime.toLocaleString()}
      </div>
      <Weather />
      <div className="mx-[40rem] mt-[-2rem] z-0">
        <Circular_F total_ca={rows} />
      </div>
      <Table
        aria-label="Example table with client-side pagination"
        bottomContent={
          <div className="flex w-full justify-center mt-4">
            <Pagination
              isCompact
              showControls
              showShadow
              color="bg-blue-500"
              page={page}
              total={Math.ceil(rows.length / rowsPerPage)}
              onChange={handlePageChange}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="date">Date</TableColumn>
          <TableColumn key="activity">Activity</TableColumn>
          <TableColumn key="totalCalories">Total Calories</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"You havent done any things today!"}>
          {items.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{year}-{month}-{date}</TableCell>
              <TableCell>{row.activity}</TableCell>
              <TableCell>{row.totalCalories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Fit;
