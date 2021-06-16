import "./index.css";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";
import DropDownMenuTwo from "./components/DropDownMenu/DropDownMenuTwo";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { getUser } from './utils/users-service';
import NavBar from "./components/NavBar/NavBar";
import AuthPage from "./pages/AuthPage/AuthPage";
import NewPostPage from "./pages/NewPostPage/NewPostPage";
import Posts from './components/Posts/Posts'
import PostIdPage from './pages/PostIdPage/PostIdPage'
import ItemCreateForm from './components/ItemCreateForm/ItemCreateForm';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

const App = () => {
  const [open, setOpen] = useState(false);
  const [menuTwo, setMenuTwo] = useState(false);
  const [user, setUser] = useState(getUser());

  const handleMenu = () => {
    setOpen(!open);
    setMenuTwo(false);
  };

  const handleSecondMenu = () => {
    setOpen(false);
    setMenuTwo(!menuTwo);
  };

  // DROP DOWN DISAPPEARS WHEN CLICKED OUTSIDE
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
      <NavBar user={user} handleMenu={handleMenu} handleSecondMenu={handleSecondMenu} />

      {/*if state is truthy, dropdownMenus will render on click*/}
      {open ? <DropDownMenu setUser={setUser} /> : ""}
      {menuTwo ? <DropDownMenuTwo /> : ""}

      <section>
        {user ? (
          <div>
            <Switch>
              <Route path="/posts/new" render={(props) => (
                <NewPostPage {...props} />
              )} />
              <Route path="/posts/:id" render={(props) => (
                <PostIdPage user={user} {...props} />
              )} />
              <Route path="/posts">
                <Posts title={'OLD BIKE FROM MY GRANDMA'} />
              </Route>
              <Route path="/items/new">
                <ItemCreateForm />
              </Route>
              <Route path={`/users`}>
                <UserProfilePage user={user}/>
              </Route>
              <Redirect to="/posts" />
            </Switch>
          </div>
        ) : (
          <Switch>
            <Route path='/login' render={(props) => (
              <AuthPage {...props} setUser={setUser} />
            )} />
            <Redirect to="/login" />
          </Switch>
        )}
      </section>
    </div>
  );
};

export default App;
