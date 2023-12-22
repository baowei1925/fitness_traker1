import React from "react";
import { useState } from "react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
import { useNavigate } from "react-router-dom";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';

function Login(){
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const navigate = useNavigate();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [emailLog, setEmailLog] = useState('');
    const [passLog, setPassLog] = useState('');
    
    function jump(){
        console.log(window.location)
        //window.location.href = "http://localhost:5173/Main"
        navigate("/Main");
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
          const result = await fetch('http://localhost:5050/register', {
            method: 'post',
            body: JSON.stringify({ name, height, weight, age, email, pass }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const data = await result.json();
          console.warn(data);
          console.log(name,email,pass);
          if (result.ok) {
            alert('Data saved successfully');
            setEmail('');
            setName('');
            setPass('');
          } else {
            alert('Failed to save data');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
      const HandleOnSubmitLogin = async (e) => {
        e.preventDefault();
        try {
          const result = await fetch('http://localhost:5050/login', {
            method: 'POST',
            body: JSON.stringify({ emailLog, passLog }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const data = await result.json();
      
          if (result.ok) {
            const token = data.token;
            const user = data.user;
            localStorage.setItem('user_id', user._id);
      
            console.log(`Welcome,${user._id} ${user.name} (${user.email})`);
            navigate('/Main');
          } else {
            alert('Login failed');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-center h-screen w-screen">
        <div className="flex flex-col items-center justify-center bg-slate-50 bg-opacity-50 h-[50rem] w-[50rem] space-y-4 rounded-full">
            <h1 className="text-2xl font-bold mb-4 font-mono text-5xl text-zinc-700">Login Form</h1>
            <Input label="Email" className="max-w-xs"
                value={emailLog}
                onChange={(e) => setEmailLog(e.target.value)} />
            <Input
            label="Password"
            value={passLog}
            onChange={(e) => setPassLog(e.target.value)}
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
                </button>
            }
            type={isVisible ? 'text' : 'password'}
            className="max-w-xs"
            />
            <div className="flex gap-x-36">
            <Button radius="full" className="text-black shadow-lg opacity-80" type="submit" onClick={HandleOnSubmitLogin}>
                Login
            </Button>
            </div>
            <Link onPress={onOpen}>Haven't sign up ? click here</Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            <ModalContent>
                {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
                    <ModalBody>
                    
                        {/* email Input */}
                        <Input
                        autoFocus
                        endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                        label="Email"
                        placeholder="Enter your Email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Name Input */}
                        <Input
                        autoFocus
                        label="Name"
                        placeholder="Enter Name"
                        variant="bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    <div className="flex gap-4">
                        {/* Weight Input */}
                        <Input
                        autoFocus
                        label="Weight"
                        placeholder="Enter Weight"
                        variant="bordered"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        />

                        {/* Height Input */}
                        <Input
                        autoFocus
                        label="Height"
                        placeholder="Enter Height"
                        variant="bordered"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        />

                        {/* Age Input */}
                        <Input
                        autoFocus
                        label="Age"
                        placeholder="Enter Age"
                        variant="bordered"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <Input
                        endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        variant="bordered"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    </ModalBody>
                    <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="primary" type="submit" onClick={handleOnSubmit}>
                        Sign up
                    </Button>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
            </Modal>

        </div>
        </div>
    )
}
export default Login