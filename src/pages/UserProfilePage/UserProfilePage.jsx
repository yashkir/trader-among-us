import React from 'react';
import ItemCreateForm from '../../components/ItemCreateForm/ItemCreateForm';
import PageTitle from "../../components/PageTitle/PageTitle"
import { Route, Link, Switch } from 'react-router-dom';
import './UserProfilePage.css';
import Carousel from '../../components/Carousel/Carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function UserProfilePage() {
  return (
    <>
      <PageTitle titleOne={"USER"} titleTwo={"PROFILE"} />  
      <div className="user-profile-container">
        <div className="user-profile-nav">
          <div>
            <Link to="/users/profile">View Profile</Link>
          </div>
          <div>
            <Link to="/users/items" exact >View Items</Link>
          </div>
          <div>
            <Link to="/users/items/new">Add Items</Link>
          </div>
        </div>
        {/* <div className="user-profile-heading">
          <h1>Test</h1>
        </div> */}
        <div className="user-profile-body">
          <Switch>
            <Route path="/users/items/new" component={ItemCreateForm} />
            <Route path="/users/items" component={Carousel} />
          </Switch>
        </div>
      </div>
      
    </>
  )
}
