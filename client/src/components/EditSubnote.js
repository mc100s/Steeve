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
      new:false,
      editMode: []
      
      
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
  
  changeLabel(e) {
    // console.log('e.key',e.key)
    if(e.key == "Enter") {
      this.setState({editMode:[]});
      this.props.handleSave(e)
    }
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
      <div className="EditSubNote"> 
      {this.selectedOpp && this.selectedOpp.notes.filter(o =>o._id ===this.props.match.params.noteId ).map((note)=> {
        return (
          <div>
            <div>
            <button type="submit" className="btn btn-rose btn-round" onClick={(e)=> this.props.createLabelPerso(e,this.opportunityId, note._id)}> <i class="material-icons">add</i> Add Your Label</button> 
            </div>
            <label className="bmd-label-floating">Title</label>
            <input key={note._id} value={note.name} onChange={(e) => this.props.onChangeTitle(e, this.opportunityId, note._id)} type="text" className="form-control" id="exampleInput1"/><br/>
              
              {note.persoItems.map((persoItem,idx)=> {
                if (this.state.editMode.indexOf(idx)==-1) {
                  return (
                    <div className="form-group">

                    <label  className="bmd-label-floating">{persoItem.label}
                    <i class="material-icons" onClick={()=>{this.setState({editMode : [idx]})}}>edit</i></label>
                    
                    <textarea key={note._id} value={persoItem.text} onChange={(e) => this.props.handleChangePersoInput(e, this.opportunityId, note._id, persoItem.label)} type="text" className="form-control col-12" rows='1'></textarea>
                    </div>
                  )

                } else {
                  return (
                    <div className="form-group">

                    <input onChange={(e) => {this.props.changeLabelPerso(e,this.opportunityId, note._id,idx)}} onKeyPress= {(e)=> this.changeLabel(e)} value = {persoItem.label} type='text' className="bmd-label-floating">
                    </input><i onClick={(e)=> {this.setState({editMode:[]}); this.props.handleSave(e)}} class="material-icons">check box</i>
                    
                    <textarea value={persoItem.text} onChange={(e) => this.props.handleChangePersoInput(e, this.opportunityId, note._id, persoItem.label)} type="text" className="form-control col-12" rows='2'></textarea>
                    </div>
                  )
                }
              }
              )}    
          
          {note.textInputs.map((textInput)=> (
            <div key={textInput.label} className="form-group">
            <label  className="bmd-label-floating">{textInput.label}</label>
            <textarea key={textInput.label} value={textInput.text} onChange={(e) => this.props.onChange(e, this.opportunityId, note._id, textInput.label)} type="text" className="form-control col-12" rows='1'></textarea>
            
            </div>
          )
        )}
        </div>
      )
    })}
    <input type="submit" id='save'value="Save" className="btn btn-rose btn-round" onClick={this.props.handleSubmit}/>
    
    <br/>
  </div>
)
}
}


export default EditSubNote;

