import React, { useState } from 'react';
import {RadioGroup, Radio} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

function Record_food() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState("breakfast");
  const [food, setFood] = useState("");
  const [totalCalories, setTotalCalories] = useState("");
  const [dateCal, setDateCal] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    const dataToSend = {
      user: userId,
      entries: [
        {
          date: dateCal,
          time: selected,
          food: food,
          totalCalories: parseInt(totalCalories, 10),
        },
      ],
    };
    console.log(dataToSend,selected);

    try {
      const response = await fetch("http://localhost:5050/calorie-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Calorie entry saved:", responseData);
        setDateCal("");
        setFood("");
        setTotalCalories("");
        onClose()
        window.location.reload()
      } else {
        console.error("Failed to save calorie entry");
        onClose()
      }
    } catch (error) {
      console.error("Error:", error);
      onClose()
    }
  };

  return (
    <div className=" h-[22rem] w-[25rem] flex flex-col items-center justify-start rounded-lg gap-8">
      <Button
        size="lg"
        onClick={onOpen}
        className="h-[250px] w-[250px] mt-[4rem] rounded-full"
        >
        Add Food
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Add Activity</ModalHeader>
            <ModalBody>
            <RadioGroup
                label="Choose"
                orientation="horizontal"
                value={selected}
                onValueChange={setSelected}
                >
                <Radio value="breakfast">breakfast</Radio>
                <Radio value="lunch">lunch</Radio>
                <Radio value="dinner">dinner</Radio>
                <Radio value="Other">Other</Radio>
            </RadioGroup>
              <Input
                value={food}
                onChange={(e) => setFood(e.target.value)}
                autoFocus
                label="Food"
                placeholder="ex: bread"
                variant="bordered"
              />
              <Input
                value={totalCalories}
                onChange={(e) => {
                  // Allow only positive integers in the calorieBurn input
                  const value = e.target.value.replace(/\D/, ''); // Remove non-numeric characters
                  setTotalCalories(value);
                }}
                autoFocus
                label="Calorie"
                placeholder="ex: 900"
                variant="bordered"
              />
              <Input
                type="date"
                value={dateCal}
                onChange={(e) => setDateCal(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
  
  );
}

export default Record_food;
