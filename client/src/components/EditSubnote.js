import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';

class EditSubNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps : [],
      selectedOpp:'',
      selectedNote:'',
      selectedLabel:'',
      didItChanged: false,
      value:'',
      currentLabel : '',
      currentItemsLabel : ['General'],
      sfdcItemsLabel :  [],
      didItChanged : false,
      didTitleChanged : false,
      title: '',
      currentInput:''
    
    }

  } 

  // componentDidMount() {
  //   this.setState({
  //     currentNote.textInputs[0].text: this.selectedOpp.notes.textInput[0].text
  //       })
  // }

  
  
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
      <div className="col-6">
        <br/>
          {console.log(this.selectedOpp)}
          {this.selectedOpp && this.selectedOpp.notes.map((note)=> {
              return (
                <div>
                  <p className=''>{note.textInputs.map((textInput)=> (
                        <form onSubmit={null}>
                        <label>
                          
                          <form>
                            <div className="form-group">
                              <label for="exampleInput1" className="bmd-label-floating">{textInput.label}</label>
                              <input value={textInput.text} onChange={(e) => this.props.onChange(e, this.opportunityId, note._id, textInput.label)} type="text" class="form-control" id="exampleInput1"/>
                            </div>
                          </form>
                        </label>
                  </form>
                    )
                  )}</p>
                </div>
              )
            })}
        
      
        <input type="submit" value="Finish" onClick={this.props.handleSubmit}/>
      </div>
    )
  }
}
  
  export default EditSubNote;


  // <form onSubmit={null}>
  //       <label>
  //         {textInput.label}
  //         <input type="text" value={this.state.value} onChange={this.handleText.bind(this)} />
  //       </label>
  // </form>