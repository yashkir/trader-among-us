import "./index.css";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";
import DropDownMenuTwo from "./components/DropDownMenu/DropDownMenuTwo";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { getUser } from './utils/users-service';
import * as userService from "./utils/users-service";
import NavBar from "./components/NavBar/NavBar";
import Form from "./components/Form/Form"
import AuthPage from "./pages/AuthPage/AuthPage";
import TradeListPage from "./pages/TradeListPage/TradeListPage";
import NewTradePage from "./pages/NewTradePage/NewTradePage";

const App = () => {
  const [open, setOpen] = useState(false);
  const [menuTwo, setMenuTwo] = useState(false);
  const [user, setUser] = useState(getUser());

  const handleLogout = () => {
    console.log("clicked");
    userService.logOut();
    setUser(null);
  }

  const handleMenu = () => {
    setOpen(!open);
    setMenuTwo(false);
  };

  const handleSecondMenu = () => {
    setOpen(false);
    setMenuTwo(!menuTwo);
  };

  //DROP DOWN DISAPPEARS WHEN CLICKED OUTSIDE
  // const appGlobalClick = () => {
  //   if (open) {
  //     setOpen(!open);
  //   }
  //   if (menuTwo) {
  //     setMenuTwo(!menuTwo);
  //   }
  // };

  return (
    <div  className="App">
      <NavBar handleMenu={handleMenu} handleSecondMenu={handleSecondMenu} />

      {/*if state is truthy, dropdownMenus will render on click*/}
      {open ? <DropDownMenu handleLogout={handleLogout} /> : ""}
      {menuTwo ? <DropDownMenuTwo /> : ""}
      <Form name={"Name"} description={"Description"} image={"Choose An Image"} />
      <section>
        {user ? (
          <>
            <Switch>
              <Route path="/trades/new">
                <NewTradePage />
              </Route>
              <Route path="/trades">
                <TradeListPage />
              </Route>
              <Redirect to="/trades" />
            </Switch>
          </>
        ) : (
          <AuthPage setUser={setUser}/>
        )}
      </section>
    </div>
  );
};

export default App;
