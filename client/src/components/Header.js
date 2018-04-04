import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';

import logo from '../steve.png';
import ReactDOM from 'react-dom';


import Home from './Home';
import MyBusiness from './MyBusiness';
import MySettings from './MySettings';
import Steve from './Steve';

import Note from './NoteDetail';
import Notes from './Notes';
import AddNote from './AddNote';
import Signup from './Signup';
import Login from './Login';
import MyBusiness3 from './MyBusiness3';
import ViewNote from './ViewNote';
import EditSubNote from './EditSubNote';
import ListOpportunities from './ListOpportunities';
import Dashboard from './Dashboard';



class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: []
    }
  }

  handleLogoutClick(e) {
    api.logout()
  }
  
  render() {                
    return (
      <div className="">
        <header className="">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="">Welcome to Steve</h1>
          <Link to="/home">Home</Link>
          <Link to="/my-business"> My Business</Link>
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> }
          {api.isLoggedIn() && <Link to="/home" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> } 

        </header>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/myNotes" component={Notes} />
          <Route path="/mySettings" component={MySettings} />
          <Route path="/notes/:id/edit" component={EditSubNote} />
          <Route path="/notes/:id" component={EditSubNote} />
          <Route path="/my-business" component={Dashboard} />
        </Switch> 

      </div>
    );
  }
}

export default Header;



