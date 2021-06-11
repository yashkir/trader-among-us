import "./index.css";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";
import DropDownMenuTwo from "./components/DropDownMenu/DropDownMenuTwo";
import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Form from "./components/Form/Form"

const App = () => {
  const [open, setOpen] = useState(false);
  const [menuTwo, setMenuTwo] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
    setMenuTwo(false);
  };

  const handleSecondMenu = () => {
    setOpen(false);
    setMenuTwo(!menuTwo);
  };

  //DROP DOWN DISAPPEARS WHEN CLICKED OUTSIDE
  const appGlobalClick = () => {
    if (open) {
      setOpen(!open);
    }
    if (menuTwo) {
      setMenuTwo(!menuTwo);
    }
  };

  return (
    <div onClick={appGlobalClick} className="App">
      <NavBar handleMenu={handleMenu} handleSecondMenu={handleSecondMenu} />

      {/*if state is truthy, dropdownMenus will render on click*/}
      {open ? <DropDownMenu /> : ""}
      {menuTwo ? <DropDownMenuTwo /> : ""}
      <Form/>
    </div>
  );
};

export default App;
