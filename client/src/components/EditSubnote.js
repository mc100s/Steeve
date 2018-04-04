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
      <div className="col-6"> 
        <br/>
          {/* {console.log('this selecyeopp',this.selectedOpp)} */}
          {this.selectedOpp && this.selectedOpp.notes.filter(o =>o._id ===this.props.match.params.noteId ).map((note)=> {
            // console.log("found")
              return (
                <div>
                  <div>
                    {/* handleChangePersoInput est sur l'input de saisie et donc au click du button je vais ajouter un nouveau perso input dont c'est l'age du capitaine 
                      Puis affichage de 'lensemvke des text input  avec le handlechangepersoInput*/}
                      <button type="submit"  onClick={(e)=> this.props.newLabelPerso(e,this.opportunityId, note._id, "l'age du capitaine")}>Add Your Label</button>

                  {/* <button type="submit"  onClick={(e)=> this.props.handleChangePersoInput(e,this.opportunityId, note._id, "l'age du capitaine")}>Add Your Label</button> */}

                  </div>
                  {/* {console.log('map is working')} */}
                  <label for="exampleInput1" className="bmd-label-floating">Title</label>
                  <input value={note.name} onChange={(e) => this.props.onChangeTitle(e, this.opportunityId, note._id)} type="text" class="form-control" id="exampleInput1"/><br/>
                  {/* faire le frere pour tedt perso + modifiable soit un input et un textearea*/}
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
    )
  }
}

  
  export default EditSubNote;

