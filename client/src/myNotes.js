import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import api from './api';
import logo from './logo.svg';
import './App.css';


class NoteCard extends Component {


  render() {                
    return (
      <div className="App">
        <h4>{this.props.note.name}</h4>
        <h4>this is the label: : {this.props.note.textInputs[0].label}</h4>
        {/* <h4>{this.props.note.name}</h4>
        <h4>{this.props.note.name}</h4>
        <h4>{this.props.note.name}</h4> */}
     </div>
    );
  }
}
class MyNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      currentNote : []
    }
  }
  componentDidMount() {
    api.getNotes()
    .then((resp) => {
      console.log('apres', resp)
      this.setState({
        notes: resp
      })
    })
    }
 
  
  render() {                
    return (
      <div className="App">
      <h2>Mes notes : {this.state.notes.map((note)=>{
          return (<NoteCard note={note}></NoteCard>)
        })}
      </h2>
     </div>
    );
  }
}



export default MyNotes;
