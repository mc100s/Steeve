import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';


class EditSubNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps : [],
      selectedOpp:'',
      selectedNote:'',
      selectedLabel:'',
      value:''
    } 
    this.handleInputChange = this.handleInputChange.bind(this)
  };
  
  handleInputChange(event){
    this.setState({
      searchInput: event.target.value,
      value: event.target.value
    })
  }
  
  getFitleredNotes() {
    let filteredNotes = []
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].name.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
        filteredNotes.push(this.state.notes[i])
      }
    }
    return filteredNotes;
  }
  
  render() {      
    this.opportunityId = this.props.match.params.opportunityId;
    for (let i = 0; i < this.props.opps.length; i++) {
      if (this.props.opps[i]._id === this.opportunityId) {
        this.selectedOpp = this.props.opps[i]
      }
    }                       
    return (
      <div>
        <br/>
          {console.log(this.selectedOpp)}
          {this.selectedOpp && this.selectedOpp.notes.map((note)=> {
              return (
                <div>
                  <p className=''>{note.textInputs.map((textInput)=> (
                      <li>{textInput.label} : <strong>{textInput.text}</strong></li>
                    )
                  )}</p>
                </div>
              )
            })}
      </div>
    )
  }
}
  
  export default EditSubNote;

  