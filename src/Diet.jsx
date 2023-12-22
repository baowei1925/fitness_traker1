import React, { useState, useEffect, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import Weather from "./Weather";
import Circular_p from "./Circular_p";

function Diet_item() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const [tot,setTot] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        //const dateCal = "2023-12-19T00:00:00.000+00:00";
        const dateCal = `${year}-${month}-${date}T00:00:00.000+00:00`;
        const response = await fetch(
          `http://localhost:5050/users/total-calories/${userId}/${dateCal}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }

        const userData = await response.json();

        let entriesData = [];
        let entriesCal = [];
        userData.forEach((user) => {
          user.entries.forEach((entry) => {
            entriesData.push({
              date: entry.date,
              time: entry.time,
              food: entry.food,
              totalCalories: entry.totalCalories,
            });
          });
        });
        userData.forEach((user) => {
          user.entries.forEach((entry) => {
            entriesCal.push({
              totalCalories: entry.totalCalories,
            });
          });
        });

        setRows(entriesData || []);
        console.log(entriesData)
        setTot(entriesCal);
        setError(null);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        setError("Error fetching user data. Please try again later.");
      }
    };

    fetchData();
  }, [year, month, date]);

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
        <Circular_p total_ca={rows} />
      </div>

      <Table
        aria-label="Example table with client side pagination"
        classNames={{
          wrapper: "min-h-[222px] mt-[3rem]",
        }}
        bottomContent={
        <div className="flex w-full justify-center mt-4">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={Math.ceil(rows.length / rowsPerPage)}
                  onChange={handlePageChange}
                />
              </div>
        }
      >
        <TableHeader>
          <TableColumn key="date">Date</TableColumn>
          <TableColumn key="time">Time</TableColumn>
          <TableColumn key="food">Food</TableColumn>
          <TableColumn key="totalCalories">Total Calories</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"You havent done any things today!"}>
          {items.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{year}-{month}-{date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.food}</TableCell>
              <TableCell>{row.totalCalories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
    </div>
  );
}

export default Diet_item;
