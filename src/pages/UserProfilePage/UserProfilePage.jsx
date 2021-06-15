import React from 'react';
import ItemCreateForm from '../../components/ItemCreateForm/ItemCreateForm';
import PageTitle from "../../components/PageTitle/PageTitle"
import { Route, Link } from 'react-router-dom';
import './UserProfilePage.css';

export default function UserProfilePage() {
  
  return (
    <>
    <PageTitle titleOne={"USER"} titleTwo={"PROFILE"} />
      <div className="user-profile-container">
        <div className="user-profile-heading">
          <h1>Test</h1>
        </div>
        <div className="user-profile-nav">
          <ul>
            <li><Link to="/users/profile">View Profile</Link></li>
            <li><Link to="/users/items" exact >View Items</Link></li>
            <li><Link to="/users/items/new">Add Items</Link></li>
          </ul>
        </div>
        <div className="user-profile-body">
          <Route path="/users/items/new" component={ItemCreateForm} />
        </div>
      </div>
      
    </>
  )
}
