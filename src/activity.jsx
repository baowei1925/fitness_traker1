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
import { ListboxWrapper } from './ListboxWrapper';

function Activity() {
  const [inputValue, setInputValue] = useState('');
  const [calorieBurn, setCalorieBurn] = useState('');
  const [listboxItems, setListboxItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();

  const handleListboxAddItem = () => {
    if (inputValue.trim() !== '' && calorieBurn.trim() !== '') {
      const calorieBurnValue = parseInt(calorieBurn);
      if (!isNaN(calorieBurnValue) && calorieBurnValue > 0) {
        setListboxItems((prevItems) => [
          ...prevItems,
          { key: inputValue, label: `${inputValue} (Calories: ${calorieBurnValue})`,act:inputValue,cal:calorieBurnValue },
        ]);
        setInputValue('');
        setCalorieBurn('');
        onClose();
      } else {
        alert('Please enter a valid positive integer for calorie burn.');
      }
    }
  };
  

  const handleItemClick = (item) => {
    setSelectedItem(item);
    console.log(item)
    onConfirmationOpen();
  };

  const handleConfirmation = (confirmed) => {
    console.log('Confirmed:', confirmed);
    console.log('SelectedItem:', selectedItem);
  
    if (confirmed && selectedItem) {
      // Remove the selected item from the list
      console.log('Removing item:', selectedItem);
      setListboxItems((prevItems) =>
        prevItems.filter((item) => item.key !== selectedItem.key)
      );
    }
    setSelectedItem(null);
    onConfirmationClose();
  };
  
  

  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-[22rem] w-[25rem] flex flex-col items-center justify-start rounded-lg gap-8">
      <div className="flex flex-row gap-4">
        <Button size="lg" onClick={onOpen} className="h-[30px] w-[250px] mt-8 bg-gradient-to-r from-blue-500 to-cyan-500">
          Add Activity
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Add Activity</ModalHeader>
            <ModalBody>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                label="Activity"
                placeholder="ex: jogging"
                variant="bordered"
              />
              <Input
                value={calorieBurn}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/, '');
                  setCalorieBurn(value);
                }}
                autoFocus
                label="Calorie Burn"
                placeholder="Enter calories"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={handleListboxAddItem}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}


export default Activity;
