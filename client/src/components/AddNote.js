import React, { Component, Switch } from 'react';
import { Route, Link } from 'react-router-dom';
import api from '../api';
import './App.css';
import NoteDetail from './NoteDetail';

class AddNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentNote : {
        name : 'New Note',
        persoItemsLabel : [],
        textInputs: [
          {
            label : 'Metrics',
            text : "" 
          },
          {
            label : 'Economic Buyer',
            text : "" 
          },
          {
            label : 'Decision Criteria',
            text : "" 
          },
          {
            label : 'Decision Process',
            text : "" 
          },
          {
            label : 'Identify Pain',
            text : "" 
          },
          {
            label : 'Champion',
            text : "" 
          },
          {
            label : 'General',
            text : "" 
          }         
        ],
        todolists : []
      },
      currentLabel : '',
      currentItemsLabel : ['General'],
      sfdcItemsLabel :  [],
      stateChangedCount : 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(label) {
    let p = 0;
    let newTextInputs = this.state.currentNote.textInputs.slice();
    
    this.setState({
      currentLabel : label
    })
    for (let i = 0; i <this.state.currentNote.textInputs.length; i++) {
      if (newTextInputs[i].label === label) {
        p = i
      }
    }
    
    this.setState({
      value : this.state.currentNote.textInputs[p].text
    }) 
  }
  
  handleText(e){
    console.log('handle texte 1');
    
    let newText = e.target.value;
    this.setState({
      value: newText
    });
    let p = 0;
    let newTextInputs = this.state.currentNote.textInputs.slice();
    for (let i = 0; i <this.state.currentNote.textInputs.length; i++) {
      if (newTextInputs[i].label === this.state.currentLabel) {
        p = i
      }
    }
    newTextInputs[p].text =  newText
    this.setState({
      textInputs: newTextInputs
    })
    
    
  }
  
  autoSave() {
    let changed = false;
    
  }
  
  
  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
    api.updateNote(this.props.match.params.id,this.state.currentNote)
    .then(this.props.history.push('/pushtoSfdc'))
  }
  
  render() {                
    return (
      <div className="App">
      <h3>
      {this.state.currentNote.textInputs.map(
        (label) => {
          return (
            <button
            className={this.state.currentLabel === label.label ? "btn btn-info button-label" :' btn btn-outline-info button-label'}
            onClick={() =>{this.handleChange(label.label)}}>{label.label}</button>
          )
        }
      )
    }
    </h3>
    <div>
    <form onSubmit={this.handleSubmit}>
    <textarea  value={this.state.value} onChange={this.handleText.bind(this)}></textarea>
    <input type="submit" value="Save Steve!" onclick={this.handleClick}/>
    </form>
    </div>
    </div>
  );
}
}

export default AddNote
