import React, { Component } from 'react';
import { Route, Link, Switch, NavLink } from 'react-router-dom';
import api from '.././api';

class Todolist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps : [],
      selectedOpp:'',
      selectedNote:'',
      datas:''
    } 
    
  };


   render() {
                
    return (
      <div className="Todolist"> 
        <img src='../img/wip.jpg' alt='Work in Progess'/>
      </div>
   )}
}

export default Todolist;

