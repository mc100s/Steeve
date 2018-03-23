import React, { Component, Switch } from 'react';
import { Route, Link } from 'react-router-dom';
import api from './api';
import logo from './logo.svg';
import './App.css';
import NoteDetail from './noteDetail';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(label) {
    console.log(label)
    this.setState({
      currentLabel : label
    })
  }

  handleText(e){
    let newText = e.target.value;
    let p = 0;
    let newTextInputs = this.state.textInputs.slice();


    for (let i = 0; i <this.state.textInputs.length; i++) {
      if (newTextInputs[i].label === this.state.currentLabel) {
        p = i
      }
    }
    console.log("p", p);
    

    newTextInputs[p].text = newText
    
    this.setState({
      textInputs: newTextInputs
    })

  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  
  render() {                
    return (
      <div className="App">
      <h3>
      {this.state.textInputs.map(
        (label) => {
          return (
            <div className="">
            <button
            className=""
            onClick={() =>{this.handleChange(label.label)}}>{label.label}</button>
            </div>
          )
        }
      )
      }
      </h3>
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          
          <input type="text" value={this.state.value} onChange={this.handleText.bind(this)} />
        </label>
        <input type="submit" value="Save Steve!" />
      </form>
        </div>
      </div>
    );
  }
}



export default AddNote

// noteProcess() {

//   this.state.meslabels = this.state.textInputs.map((label) => {return (
//     <div className="">
//     <button
//     className=""
//     onClick={console.log('cliké')}>{label.label}</button>
//     </div>)}
//   )
// }

// componentDidMount() {
//   this.noteProcess()
// }


// <button
//       className="btn btn-default"
//       onClick={this.noteProcess.bind(this)}>Add a Note</button>