import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Food Calories Chart last 7 days',
    },
  },
};

const date = new Date();
const userId = localStorage.getItem("user_id");
const response = await fetch(
	`http://localhost:5050/users/total-calories/${userId}/3/${date}`
);
const userData = await response.json();
const caloriesArray = userData.map((item) => item.entries.map((entry) => entry.totalCalories));
const dateArray = userData.map((item) => item.entries.map((entry) => entry.date));

const accumulatedData = dateArray
  .flat()
  .reduce((acc, date, index) => {
    const existingEntry = acc.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.totalCalories += caloriesArray.flat()[index];
    } else {
      acc.push({ date, totalCalories: caloriesArray.flat()[index] });
    }
    return acc;
  }, []);
const totalCaloriesArray = accumulatedData.map((entry) => entry.totalCalories);
const dateArray2 = accumulatedData.map((entry) => {
	const formattedDate = entry.date.slice(5, 10); // Extract month and day
	return formattedDate;
});

const reversedTotalCalories = totalCaloriesArray.reverse();
const reversedDateArray2 = dateArray2.reverse();
const labels = reversedDateArray2;

const data = {
  labels,
  datasets: [
    {
      label: 'Total Calories',
      data: reversedTotalCalories,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


const Graph_Line = () =>{
  return(
    <Line options={options} data={data}></Line>
  );
};

export default Graph_Line;