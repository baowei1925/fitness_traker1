import React, { useState } from 'react';
import {
  Listbox,
  ListboxItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';

function Activity_a() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [activityCal, setActivityCal] = useState("");

  const handleSubmitFitness = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    const dataToSend = {
      user: userId,
      date: date,
      activity: activity,
      totalCalories: parseInt(activityCal, 10),
    };
    console.log(dataToSend);
  
    try {
      const response = await fetch("http://localhost:5050/fitness-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Fitness entry saved:", responseData);
        setActivity("");
        setActivityCal("");
        onClose()
        window.location.reload()
      } else {
        console.error("Failed to save fitness entry");
        onClose()
      }
    } catch (error) {
      console.error("Error:", error);
      onClose()
    }
  };
  function HandleError(){return !activity.trim() || !activityCal.trim() || !date.trim();}
  return (
    
      <div className=" h-[22rem] w-[25rem] flex flex-col items-center justify-start rounded-lg gap-8">
        <Button size="lg" onClick={onOpen} className="h-[250px] w-[250px] mt-[4rem] rounded-full">
          Add Activity
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
          <ModalContent>z
            <ModalHeader className="flex flex-col gap-1">Add Activity</ModalHeader>
            <ModalBody>
              <Input
                isRequired
                
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                autoFocus
                label="Activity"
                placeholder="ex: jogging"
                variant="bordered"
              />
              <Input
                isRequired
                
                value={activityCal}
                onChange={(e) => setActivityCal(e.target.value)}
                autoFocus
                label="Calorie Burn"
                placeholder="Enter calories"
                variant="bordered"
              />
              <Input
                isRequired
                
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={handleSubmitFitness}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
     
  );
}


export default Activity_a;
