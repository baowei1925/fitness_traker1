import React from "react";
import { useState } from "react";
import {Avatar} from "@nextui-org/react";
import user from './IMG/user.png';
import Activity from "./activity";
import ReactWeather, { useVisualCrossing } from 'react-open-weather';


function Weather(){
        const { data, isLoading, errorMessage } = useVisualCrossing({
            key: '44TQRJSUG2EAJWSZK4S43W7LV',
            lat: '25.12825',
            lon: '121.7419',
            lang: 'en',
            unit: 'metric',
          });
        
    
    return (
        <div className="h-[7rem] w-[30rem]  ">
            <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel="Keelung"
            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
            showForecast = {false}
            />
        </div>
        


    )
}
export default Weather
//44TQRJSUG2EAJWSZK4S43W7LV