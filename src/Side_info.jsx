import React from "react";
import { useState, useEffect } from "react";
import {Avatar} from "@nextui-org/react";
import user1 from './IMG/user.png';
import Activity from "./activity";
import Activity_a from "./add_activity";

function Side(){
    const [user, setUser] = useState(null);
    const [userCal, setUserCal] = useState(null);
    const [error, setError] = useState(null);
    const [date, setDate] = useState("");
    const [food, setFood] = useState("");
    const [totalCalories, setTotalCalories] = useState("");
    const [dateCal, setDateCal] = useState("");
    const [showCal, setShowCal] = useState("");
    const [calDay, setCalDay] = useState("");
    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        const dateStorage = localStorage.getItem("date");
        const fetchUser = async () => {
          try {
            const response = await fetch(
              "http://localhost:5050/users/find-user/" + userId
            );
    
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
              setError(null);
            } else {
              const errorData = await response.json();
              setError(errorData.message);
              setUser(null);
            }
          } catch (error) {
            console.error("Error fetching user:", error);
            setError("Something went wrong");
            setUser(null);
          }
        };
    
        if (userId) {
          fetchUser();
        }
      }, []);
        return (
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-[48rem] w-[27rem] flex flex-col items-center justify-start rounded-lg gap-8 mt-[4rem]">
            <Avatar src={user1} alt="user" className="h-[10rem] w-[10rem] text-large mt-8" />
            {user?(
              <>
              <h3 className="text-2xl font-bold mb-4 font-mono text-5xl text-zinc-700">{user.name}</h3>
              <div className="flex gap-4">
                <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-800">Weight: {user.height}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-800">Height: {user.weight}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-800">Age: {user.age}</p>
                </div>
            </div>
            </>): (
              <p>{error || "Loading..."}</p>
            )}
            <Activity_a></Activity_a>
        </div>
    )
    
}
export default Side