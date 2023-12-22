import { Flat } from "@alptugidin/react-circular-progress-bar";
import React, { useEffect, useMemo, useState } from "react";

function Circular_p({ total_ca }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [target, setTarget] = useState(0);
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
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

  useEffect(() => {
    if (user && total_ca) {
      const target1 =
        9.99 * user.weight +
        6.25 * user.height -
        4.92 * user.age +
        166 * 1 -
        161;
      const totalValue = total_ca.reduce(
        (acc, item) => acc + (item.totalCalories || 0),
        0
      );
      setTotal(totalValue);
      setTarget(parseInt(target1*1.1));
      console.log(total);
      console.log(parseInt(target));
    }
  }, [user, total_ca]);

  const TDEE = useMemo(() => {
    return user ? 9.99 * user.weight + 6.25 * user.height - 4.92 * user.age + 166 * 1 - 161 * 1.2 : 3000;
  }, [user]);

  return (
    <div className=" h-[18rem] w-[18rem] mt-[-3rem] ml-[-4rem]">
      <Flat
        progress={total}
        range={{ from: 0, to: TDEE }}
        sign={{ value: "cal", position: "end" }}
        text={`${target}cal`}
        showMiniCircle={false}
        sx={{
          strokeColor: "#6979f2",
          barWidth: 7,
          bgColor: { value: "#000000", transparency: "20" },
          valueSize: 20,
          valueWeight: "bold",
          valueColor: '#ecfeff',
          valueFamily: "Times New Roman",
          textSize: 15,
          textWeight: "bolder",
          textFamily: "Times New Roman",
          miniCircleColor: "#519394",
          textColor: '#ecfeff',
        }}
      />
    </div>
  );
}

export default Circular_p;
