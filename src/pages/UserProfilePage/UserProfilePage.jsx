import React, { useState, useEffect } from 'react';
import ItemCreateForm from '../../components/ItemCreateForm/ItemCreateForm';
import PageTitle from "../../components/PageTitle/PageTitle"
import { Route, Link, Switch } from 'react-router-dom';
import './UserProfilePage.css';
import Carousel from '../../components/Carousel/Carousel';
import itemsApi from "../../utils/items-api";

export default function UserProfilePage({ user }) {
  const [itemData, setItemData] = useState([]);

  const getItems = async () => {
    if (user) {
      const items = await itemsApi.show(user._id);
      setItemData(items.item);
    }
  };

  useEffect(() => {
    getItems();
  }, [])

  return (
    <>
      <PageTitle titleOne={"WELCOME"} titleTwo={user.name.toUpperCase()} />
      <div className="user-profile-container">
        <div className="user-profile-nav">
          <div>
            <Link to={{ pathname: `/users/${user._id}/items`, state: user }} exact >View Items</Link>
          </div>
          <div>
            <Link to="/users/items/new">Add Items</Link>
          </div>
        </div>
        {itemData.length === 0 ? <p className="UserProfilePage-prompt">You currently have no items!</p> : ''}

        <div className="user-profile-body">
          <Switch>
            <Route path="/users/items/new" component={ItemCreateForm} />
            {itemData.length > 0 ? <Route path={`/users/:id/items`} render={() => <Carousel user={user} />} /> : ''}
          </Switch>
        </div>
      </div>

    </>
  )
}
