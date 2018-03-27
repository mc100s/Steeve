import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';
import AddNote from './AddNote';




class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      accounts : [],
      opps:[]
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
  

  render() {                
    return (
      <div> 
      {/* {setTimeOut(console.log(notes,1500))} */}
  
      </div>
    )
  }
}


  export default Search;