import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';
import AddNote from './AddNote';
// import Search from 'react-search-box';




class ViewNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      accounts : [],
      opps:[],
      searchInput :''
    } 
  };

  componentDidMount() {
    api.getAccounts()
    .then((resp) => {
      this.setState({
        accounts: resp
      })
    });
    api.getNotes()
    .then((resp) => {
      this.setState({
        notes: resp
      })
      // console.log(resp)
    })
    api.getOpps()
    .then((resp) => {
      this.setState({
        opps: resp
      })
      console.log('Opps',resp)
    })


  }
  
  mergeDatas() {

  }
  render() {                
    return (
      <div> 
        <form>
          <label>
          
            <input type="text" name="name" />
          </label>
            <input type="submit" value="Search" />
        </form>
  
      </div>
    )
  }
}


  export default ViewNote;