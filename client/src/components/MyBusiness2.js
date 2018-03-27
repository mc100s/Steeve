import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';
import AddNote from './AddNote';
import LastAccount from './LastAccount';
import Search from './Search';

class MyBusiness2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      searchInput : ''
    } 
  };

  render() {                
    return (
      <div>
        <LastAccount/>
        <Search/>
      </div>
    )
  }
}

  export default MyBusiness2;