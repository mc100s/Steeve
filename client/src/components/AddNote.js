import React, { Component, Switch } from 'react';
import { Route, Link } from 'react-router-dom';
import api from '../api';
import './App.css';
import NoteDetail from './NoteDetail';

class AddNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLabel : '',
      name : 'New Note',
      currentItemsLabel : ['General'],
      sfdcItemsLabel :  [],
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
          label : 'Decisition Process',
          text : "" 
        },
        {
          label : 'Identify Pain',
          text : "" 
        },
        {
          label : 'Champion',
          text : "" 
        }         
      ],
      todolists : []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    let kikou = 'var dns le constructor'
  }
  
  handleChange(label) {
    console.log('handle change click');
    
    let p = 0;
    let newTextInputs = this.state.textInputs.slice();
    // console.log(label)
    
    this.setState({
      currentLabel : label
    })
    // this.state.value = 'test'
    for (let i = 0; i <this.state.textInputs.length; i++) {
      if (newTextInputs[i].label === label) {
        p = i
      }
    }
    console.log("DEBUG p", p, this.state.textInputs[p], !this.state.textInputs[p].text === '');
    
    this.setState({
      value : this.state.textInputs[p].text
    }) 
  }

  handleText(e){
    console.log('handle texte 1');
    
    let newText = e.target.value;
    this.setState({
      value: newText
    });
    let p = 0;
    let newTextInputs = this.state.textInputs.slice();
    for (let i = 0; i <this.state.textInputs.length; i++) {
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


  handleClick(e) {
    e.preventDefault();
    console.log('clicked');
    api.createNote(this.state)
    .then(console.log('note created'))
    
    
  }
  
  render() {                
    return (
      <div className="App">
        <h3>
        {this.state.textInputs.map(
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
