import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Fitness Calories Chart last 7 days',
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

const response2 = await fetch(
	`http://localhost:5050/users/total-calories/${userId}/4/${date}`
);
const fitData = await response2.json();
const caloriesArray2 = fitData.map((item) => item.totalCalories);
const dateArray3 = fitData.map((item)  => item.date);

const accumulatedData2 = dateArray3
  .flat()
  .reduce((acc, date, index) => {
    const existingEntry = acc.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.totalCalories += caloriesArray2.flat()[index];
    } else {
      acc.push({ date, totalCalories: caloriesArray2.flat()[index] });
    }
    return acc;
  }, []);
const totalCaloriesArray2 = accumulatedData2.map((entry) => entry.totalCalories);
const dateArray4 = accumulatedData2.map((entry) => {
	const formattedDate = entry.date.slice(5, 10); // Extract month and day
	return formattedDate;
});

const reversedTotalCalories2 = totalCaloriesArray2.reverse();
const reversedDateArray4 = dateArray4.reverse();

const labels = reversedDateArray2;
const labels2 = reversedDateArray4;
console.log(reversedDateArray4,reversedTotalCalories2);

const data = {
  labels,
  datasets: [
    {
      label: 'Total Calories',
      data: reversedTotalCalories,
      backgroundColor: [
		'rgb(255, 99, 132)'
	  ],
    },
  ],
};

const data2 = {
  labels2,
  datasets: [
    {
      label: 'Total Calories',
      data: reversedTotalCalories2,
      backgroundColor: [
		'rgb(132,99,255)'
	  ],
    },
  ],
};

const Graph = () =>{
  return(
    <Bar options={options} data={data}></Bar>
    // <Bar options={options2} data={data2} />
  );
};

export default Graph;