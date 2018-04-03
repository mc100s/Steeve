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

  updateOppIdNoteID2 () {
    console.log('thisupdate active')
    console.log('this.props.location.pathname.match(/\/my-business\/(.*)\/notes/)[1]',this.props.location.pathname.match(/\/my-business\/(.*)\/notes/)[1])
    console.log('this.props.location.pathname.match(/\/my-business\/(.*)\//).input',this.props.location.pathname.match(/\/my-business\/(.*)\//).input)
    this.oppId = this.props.location.pathname.match(/\/my-business\/(.*)\/notes/)[1];
    let tempNoteId =  this.props.location.pathname.match(/\/my-business\/(.*)\//).input;
    this.noteChangedId = tempNoteId.substring(44)
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
    let CurrentNoteId=(this.props.location.pathname.match(/\/my-business\/(.*)\//).input.substring(44)) 
    for (let i = 0; i < this.props.opps.length; i++) {
      if (this.props.opps[i]._id === this.opportunityId) {
        this.selectedOpp = this.props.opps[i]
      }
     
    } 
                         
    return (
      <div className="col-6"> 
        <br/>
          {console.log(this.selectedOpp)}
          {this.selectedOpp && this.selectedOpp.notes.filter(o =>o._id ===this.props.match.params.noteId ).map((note)=> {
              return (
                <div>
                  <label for="exampleInput1" className="bmd-label-floating">Title</label>
                  <input value={note.name} onChange={(e) => this.props.onChangeTitle(e, this.opportunityId, note._id)} type="text" class="form-control" id="exampleInput1"/><br/>
                 
                  {note.textInputs.map((textInput)=> (
                      <div className="form-group">
                        <label for="exampleInput1" className="bmd-label-floating">{textInput.label}</label>
                        <textarea value={textInput.text} onChange={(e) => this.props.onChange(e, this.opportunityId, note._id, textInput.label)} type="text" className="form-control col-12" rows='4'></textarea>
                      </div>
                    )
                  )}
                </div>
              )
            })}
        
      
        <input type="submit" value="Finish" onClick={this.props.handleSubmit}/>
        {console.log(this.props.location.pathname.match(/\/my-business\/(.*)\//).input.substring(44))}
        {this.updateOppIdNoteID2.bind(this)}
        {console.log('props IDSSS',this.props.oppId,this.props.NoteId)}
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