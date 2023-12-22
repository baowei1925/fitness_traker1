import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Navy() {
  const navigate = useNavigate();

  function jump() {
    console.log(window.location);
    navigate("/");
  }
  function jump1() {
    console.log(window.location);
    navigate("/Main");
  }
  function jump2() {
    console.log(window.location);
    navigate("/Diet_page");
  }
  function jump3() {
    console.log(window.location);
    navigate("/History");
  }



  return (
    <Navbar className="fixed top-0 w-full z-10">
      <NavbarBrand>
        <p className="font-bold text-gray-800">Fitness Tracker</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 justify-center">
        <NavbarItem >
          <Link className="cursor-pointer" color="primary" onClick={jump1}>
            Fitness
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="cursor-pointer" color="primary" onClick={jump2}>
            Diet
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="cursor-pointer" color="primary" onClick={jump3}>
            History
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" onClick={jump} variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Navy;
