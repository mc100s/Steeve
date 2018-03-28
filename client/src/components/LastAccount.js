import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';
import AddNote from './AddNote';

class LastAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      accounts : []
    } 
  };

  componentDidMount() {
    api.getAccounts()
    .then((resp) => {
      this.setState({
        accounts: resp
      })
    })
  }
  

  render() {                
    return (
      <div>
        <span>{this.state.accounts.map((account)=>
              {return (account.alias)})
              }
        </span>
      </div>
    )
  }
}

  export default LastAccount;