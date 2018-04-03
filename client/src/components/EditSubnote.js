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
      currentInput:'',
      new:false
    
    }

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
    let CurrentNoteId=this.props.match.params.noteId
    for (let i = 0; i < this.props.opps.length; i++) {
      if (this.props.opps[i]._id === this.opportunityId) {
        this.selectedOpp = this.props.opps[i]
      }
     
    } 
                         
    return (
      this.state.new ? (<EmptyNote/>) : (
      <div className="col-6"> 
        <br/>
          {console.log('this selecyeopp',this.selectedOpp)}
          {this.selectedOpp && this.selectedOpp.notes.filter(o =>o._id ===this.props.match.params.noteId ).map((note)=> {
            console.log("found")
              return (
             
                  <div>
                    {console.log('map is working')}
                    <label for="exampleInput1" className="bmd-label-floating">Title</label>
                    <input value={note.name} onChange={(e) => this.props.onChangeTitle(e, this.opportunityId, note._id)} type="text" class="form-control" id="exampleInput1"/><br/>
                  
                    {note.textInputs.map((textInput)=> (
                        <div className="form-group">
                          <label for="exampleInput1" className="bmd-label-floating">{textInput.label}</label>
                          <textarea value={textInput.text} onChange={(e) => this.props.onChange(e, this.opportunityId, note._id, textInput.label)} type="text" className="form-control col-12" rows='2'></textarea>
                        </div>
                      )
                    )}


                  </div>
                
              )
            })}
        
      
        <input type="submit" value="Finish" onClick={this.props.handleSubmit}/>
        <br/>
      </div>
    ))
  }
}


class EmptyNote extends Component {


  render() {
    {console.log('composant EmptyNote')}
    return(
      <div className="col-6"> emptynote
      <br/>
        {this.selectedOpp && this.selectedOpp.notes.filter(o =>o._id ===this.props.match.params.noteId ).map((note)=> {
          return (
            <div>
              <label for="exampleInput1" className="bmd-label-floating">Title</label>
              <input value={' '} onChange={(e) => this.props.onChangeTitle(e, this.opportunityId, note._id)} type="text" class="form-control" id="exampleInput1"/><br/>
                  {note.textInputs.map((textInput)=> (
                      <div className="form-group">
                        <label for="exampleInput1" className="bmd-label-floating">{textInput.label}</label>
                        <textarea value={' '} onChange={(e) => this.props.onChange(e, this.opportunityId, note._id, textInput.label)} type="text" className="form-control col-12" rows='2'></textarea>
                      </div>
                    )
                  )}
            </div>
          )
        })
        }
      <input type="submit" value="Finish" onClick={this.props.handleSubmit}/>
      <br/>
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