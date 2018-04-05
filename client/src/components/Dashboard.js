import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import api from '../api';
import ListOpportunities from './ListOpportunities';
import ListNotes from './ListNotes';
import EditSubNote from './EditSubNote';


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps: [],
      notes:[],
      selectedOpp:'',
      didItChanged : false,
      labelPerso:'My new Label',
      noteTitle:'',
      search : '',
      newLabelPerso : ''
    }
    this.oppId = null;
    this.oppChangedId = null;
    this.noteChangedId = null;
  
    // setInterval(this.autoSave.bind(this), 3000);
  }


createLabelPerso(e, opportunityId, noteId) {
  // console.log('handeChangeLabelpero!', e, opportunityId, noteId)
  let newOpps = this.state.opps.slice();
  for (let iOpp = 0; iOpp < this.state.opps.length; iOpp++) {
    if (this.state.opps[iOpp]._id === opportunityId) {
      this.oppIndex = iOpp
      for (let iNote = 0; iNote < this.state.opps[iOpp].notes.length; iNote++) {
        // console.log('debug',this.state.opps[iOpp].notes[iNote]._id, noteId)
        if (this.state.opps[iOpp].notes[iNote]._id === noteId) {
          
                newOpps[iOpp].notes[iNote].persoItems.push(
                  {
                    label : "My new Label",
                    text : ''
                  }
                )
              
              this.setState({
                opps: newOpps,
                didItChanged: true
              })
            
          return;
        }
      }
    }
  }  
}



  newLabelPerso(e, opportunityId, noteId, labelPerso) {
    let newOpps = this.state.opps.slice();
    for (let iOpp = 0; iOpp < this.state.opps.length; iOpp++) {
      if (this.state.opps[iOpp]._id === opportunityId) {
        this.oppIndex = iOpp
        for (let iNote = 0; iNote < this.state.opps[iOpp].notes.length; iNote++) {
          if (this.state.opps[iOpp].notes[iNote]._id === noteId) {
            this.noteChangedId = this.state.opps[iOpp].notes[iNote]._id
            newOpps[iOpp].notes[iNote].persoItems.push(
              {
                label : labelPerso,
                text : ' '
              }
            )
            this.setState({
              opps: newOpps,
              didItChanged: true
            })
            
            return;
          }
        }
      }
    }  
  }
  
  handleChangePersoInput (e, opportunityId, noteId, labelPerso) {
    // console.log('e.target.value', e.target.value)
    // console.log('opportunityId', opportunityId)
    // console.log('noteId', noteId)
    // console.log('labelPerso', labelPerso)
    let newOpps = this.state.opps.slice();
    for (let iOpp = 0; iOpp < this.state.opps.length; iOpp++) {
      if (this.state.opps[iOpp]._id === opportunityId) {
        this.oppIndex = iOpp
        for (let iNote = 0; iNote < this.state.opps[iOpp].notes.length; iNote++) {
          if (this.state.opps[iOpp].notes[iNote]._id === noteId) {
            // console.log("Note found", this.state.opps[iOpp].notes[iNote]);
            this.noteChangedId = this.state.opps[iOpp].notes[iNote]._id
            for (let persoItems = 0; persoItems < this.state.opps[iOpp].notes[iNote].persoItems.length; persoItems++) {
              if (this.state.opps[iOpp].notes[iNote].persoItems[persoItems].label === labelPerso) {
                // console.log("Label found", this.state.opps[iOpp].notes[iNote].persoItems[persoItems]);
                newOpps[iOpp].notes[iNote].persoItems[persoItems].text = e.target.value;
                this.setState({
                  opps: newOpps,
                  didItChanged: true
                })
                return;
              }
            }
          }
        }
      }
    }     
  }
  
  autoSave(){
    let noteId = this.props.location.pathname.match(/\/my-business\/(.*)\/notes/);
    console.log('setintervall')
    console.log('noteId',this.props.location.pathname.match(/\/my-business\/(.*)\/notes/))
    if (this.state.didItChanged) {
      for (let i = 0; i< this.state.opps.length;i++)
      {
        api.updateNote(this.noteChangedId,this.state.opps[this.oppIndex].notes[this.noteChangedId])
        console.log('saved')
        this.setState({
          didItChanged: false
        })
      }
    }
  }
  
  componentDidMount() {
    api.getOpps()
    .then((resp) => {
      this.setState({
        opps: resp
      })
    })
    // .then(console.log('OPPS',this.state.opps))
  }

  handleNewNote(id){
      // console.log('id au back',id)
      api.createNote(id)
      .then((resp) => {
        // console.log(resp)
        api.getOpps()
        .then((opps) => {
          this.setState({
            opps:opps,
            new:true
          })
          this.props.history.push('/my-business/'+ id+'/notes/'+resp._id) // fait un redurect vers une nouvelle route          
        })
        // .then(console.log('OPPS',this.state.opps))
    })
  }  
  selectedOpp = (event) =>{
    this.setState({selectedOpp:event})
    console.log('selectedopp',event)
    this.getFilteredNote(event)
  }
  
  getFilteredNote=(oppId)=> {
    console.log('opp',oppId)
    let noteTitle=[];
    for (let i = 0; i < this.state.opps.length; i++) {
      if (oppId === this.state.opps[i]._id) {
        for (let j = 0; j < this.state.opps[i].notes.length; j++) {
          console.log('export array',this.state.opps[i].notes[j])
          noteTitle.push({name:this.state.opps[i].notes[j].name,id:this.state.opps[i].notes[j]._id})
          console.log('export des titres',noteTitle)
        }
      }
    }
    // console.log('debug',notesData)
    this.setState({noteTitle:noteTitle})
    return(noteTitle)
  }
  
  handleChange(e, opportunityId, noteId, label) {
    let newOpps = this.state.opps.slice();
    for (let iOpp = 0; iOpp < this.state.opps.length; iOpp++) {
      if (this.state.opps[iOpp]._id === opportunityId) {
        this.oppIndex = iOpp
        for (let iNote = 0; iNote < this.state.opps[iOpp].notes.length; iNote++) {
          if (this.state.opps[iOpp].notes[iNote]._id === noteId) {
            // console.log("Note found", this.state.opps[iOpp].notes[iNote]);
            this.noteChangedId = this.state.opps[iOpp].notes[iNote]._id
            for (let iTextInput = 0; iTextInput < this.state.opps[iOpp].notes[iNote].textInputs.length; iTextInput++) {
              if (this.state.opps[iOpp].notes[iNote].textInputs[iTextInput].label === label) {
                // console.log("Label found", this.state.opps[iOpp].notes[iNote].textInputs[iTextInput]);
                newOpps[iOpp].notes[iNote].textInputs[iTextInput].text = e.target.value;
                this.setState({
                  opps: newOpps,
                  didItChanged: true
                })
                return;
              }
            }
          }
        }
      }
    } 
  }
  
  handleChangeTitle(e, opportunityId, noteId) {
    let newOpps = this.state.opps.slice();
    for (let iOpp = 0; iOpp < this.state.opps.length; iOpp++) {
      if (this.state.opps[iOpp]._id === opportunityId) {
        this.oppIndex = iOpp
        for (let iNote = 0; iNote < this.state.opps[iOpp].notes.length; iNote++) {
          if (this.state.opps[iOpp].notes[iNote]._id === noteId) {
            // console.log("Note found", this.state.opps[iOpp].notes[iNote]);
            this.noteChangedId = this.state.opps[iOpp].notes[iNote]._id
            newOpps[iOpp].notes[iNote].name = e.target.value;
            this.setState({
              opps: newOpps,
              didItChanged: true
            })
            return;
          }
        }
      }
    } 
  }
  
  getSelectedOpp() {
    let match =  this.props.location.pathname.match(/\/my-business\/(.*)\/notes/);
    if (!match)
    return null;
    
    this.opportunityId = match[1];
    for (let i = 0; i < this.state.opps.length; i++) {
      if (this.state.opps[i]._id === this.opportunityId) {
        return this.state.opps[i]
      }
    } 
    return null
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    let oppId = this.props.location.pathname.match(/\/my-business\/(.*)\/notes/)[1];
    let oppIndex = ''
    let tempNoteId =  this.props.location.pathname.match(/\/my-business\/(.*)\//).input;
    let noteId = tempNoteId.substring(44)
    let noteIndex =''
    
    let newOpps = this.state.opps.slice();
    for (let iOpp = 0; iOpp < this.state.opps.length; iOpp++) {
      if (this.state.opps[iOpp]._id === oppId) {
        oppIndex = iOpp
        // console.log("Note found", iOpp);
        for (let iNote = 0; iNote < this.state.opps[iOpp].notes.length; iNote++) {
          if (this.state.opps[iOpp].notes[iNote]._id === noteId) {
            // console.log("IDDDDDDDDDD", iNote);
            noteIndex = iNote
          }
        }
      }
    } 
    // console.log('id Note', noteId )
    // console.log('note à envoyer', this.state.opps[oppIndex].notes[noteIndex])
    api.updateNote(noteId,this.state.opps[oppIndex].notes[noteIndex])
    .then(this.setState({
      didItChanged: false
    }))
    .then(this.props.history.push('/my-business'))
  }

  handleSave(e) {
    e.preventDefault();
    
    let oppId = this.props.location.pathname.match(/\/my-business\/(.*)\/notes/)[1];
    let oppIndex = ''
    let tempNoteId =  this.props.location.pathname.match(/\/my-business\/(.*)\//).input;
    let noteId = tempNoteId.substring(44)
    let noteIndex =''
    
    let newOpps = this.state.opps.slice();
    for (let iOpp = 0; iOpp < this.state.opps.length; iOpp++) {
      if (this.state.opps[iOpp]._id === oppId) {
        oppIndex = iOpp
        // console.log("Note found", iOpp);
        for (let iNote = 0; iNote < this.state.opps[iOpp].notes.length; iNote++) {
          if (this.state.opps[iOpp].notes[iNote]._id === noteId) {
            // console.log("IDDDDDDDDDD", iNote);
            noteIndex = iNote
          }
        }
      }
    } 
    // console.log('id Note', noteId )
    console.log('note à envoyer', this.state.opps[oppIndex].notes[noteIndex])
    api.updateNote(noteId,this.state.opps[oppIndex].notes[noteIndex])
    .then(this.setState({
      didItChanged: false
    }))
    
  }

  handleSearch(e) {
    // console.log('e',e.target.value)
    this.setState({
      search:e.target.value
    })
  }
  
  getSearchedOpps() {
    // console.log('opps dans getsearch',this.state.opps)
    let filteredOpps = []
    for (let i = 0; i < this.state.opps.length; i++) {
      if ( this.state.opps[i].oppName.toLowerCase().includes(this.state.search.toLowerCase())
          
      )
          
    {
        filteredOpps.push(this.state.opps[i])
      }
    }
    return filteredOpps;

   
  }

  changeLabelPerso (e, opportunityId, noteId,idx) {
    let newOpps = this.state.opps.slice();
    for (let iOpp = 0; iOpp < this.state.opps.length; iOpp++) {
      if (this.state.opps[iOpp]._id === opportunityId) {
        this.oppIndex = iOpp
        for (let iNote = 0; iNote < this.state.opps[iOpp].notes.length; iNote++) {
          if (this.state.opps[iOpp].notes[iNote]._id === noteId) {
            this.noteChangedId = this.state.opps[iOpp].notes[iNote]._id
            newOpps[iOpp].notes[iNote].persoItems[idx].label = e.target.value       
            this.setState({
              opps: newOpps,
              didItChanged: true
            })
            return;
          }
        }
      }
    }  

  }

  render() {                
    return (
      <div className="App">
        <div className="row">
          <Route path="/my-business" render={() => <ListOpportunities getSearchedOpps={this.getSearchedOpps.bind(this)} onClick={this.selectedOpp.bind(this)} opps={this.state.opps} search={this.state.search} handleSearch={this.handleSearch.bind(this)}/>} />
          <Route path="/my-business/:opportunityId/notes" render={(props) => <ListNotes {...props} opps={this.state.opps} handleNewNote={this.handleNewNote.bind(this)}/>} />
          <Route path="/my-business/:opportunityId/notes/:noteId" render={(props) => 
            <EditSubNote {...props} updateOppIdNoteID={this.updateOppIdNoteID} 
             createLabelPerso ={this.createLabelPerso.bind(this)}
              onChangeTitle={this.handleChangeTitle.bind(this)}  
              opps={this.state.opps} 
              handleChangePersoInput = {this.handleChangePersoInput.bind(this)}
              newLabelPerso = {this.newLabelPerso.bind(this)} 
              labelPerso= {this.state.labelPerso}
              onChange={this.handleChange.bind(this)}
              changeLabelPerso = {this.changeLabelPerso.bind(this) } 
              handleSave={this.handleSave.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)} />
          } />
        </div>
      </div>
    );
  }
}

export default Dashboard;
