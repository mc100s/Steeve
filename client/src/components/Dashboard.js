import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import api from '../api';
import ListOpportunities from './ListOpportunities';
import ListNotes from './ListNotes';
import EditSubNote from './EditSubNote';

let noteChangedId =''
let oppChangedId = ''
let oppIndex = ''

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps: [],
      notes:[],
      selectedOpp:'',
      didItChanged : false,
      noteTitle:''
    }
    setInterval(this.autoSave.bind(this), 3000);
  }

  autoSave(){
    let noteId = this.props.location.pathname.match(/\/my-business\/(.*)\/notes/);
    console
    console.log('setintervall')
    if (this.state.didItChanged) {
      for (let i = 0; i< this.state.opps.length;i++)
      {
        console.log('KIKOUUU',this.state.opps[i]._id, oppChangedId)
        if(this.state.opps[i]._id = oppChangedId )
        oppIndex = i
        api.updateNote(noteChangedId,this.state.opps[i].notes)
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
      .then(console.log('OPPS',this.state.opps))
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
    // console.log("DEUBG YOLO");
    // console.log("DEUBG e.target.value", e.target.value);
    // console.log("DEUBG opportunityId", opportunityId);
    // console.log("DEUBG noteId", noteId);
    // console.log("DEUBG label", label);
    // console.log("DEUBG this.state.opps", this.state.opps);
    // console.log("DEUBG this.getSelectedOpp()", this.getSelectedOpp());
    // console.log("DEUBG this.props.match.params.opportunityId", this.props.match.params.opportunityId);
    // console.log("DEUBG this.props.location.pathname", this.props.location.pathname);
    // console.log("DEUBG this.props.location.pathname.match(/\/my-business\/(.*)\/notes/)", this.props.location.pathname.match(/\/my-business\/(.*)\/notes/));
    // // "/my-business/5abd40ef53064b4da4cb1874/notes/5abd40f053064b4da4cb1889".match(/\/my-business\/(.*)\/notes/)

    let newOpps = this.state.opps.slice();
    for (let iOpp = 0; iOpp < this.state.opps.length; iOpp++) {
      if (this.state.opps[iOpp]._id === opportunityId) {
        oppChangedId = this.state.opps[iOpp]._id
        for (let iNote = 0; iNote < this.state.opps[iOpp].notes.length; iNote++) {
          if (this.state.opps[iOpp].notes[iNote]._id === noteId) {
            console.log("Note found", this.state.opps[iOpp].notes[iNote]);
              noteChangedId = this.state.opps[iOpp].notes[iNote]._id
            for (let iTextInput = 0; iTextInput < this.state.opps[iOpp].notes[iNote].textInputs.length; iTextInput++) {
              if (this.state.opps[iOpp].notes[iNote].textInputs[iTextInput].label === label) {
                console.log("Label found", this.state.opps[iOpp].notes[iNote].textInputs[iTextInput]);
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
    console.log('submitted');
    api.updateNote(noteChangedId,this.state.opps[oppIndex].notes)
      .then(this.setState({
          didItChanged: false
        }))
    .then(this.props.history.push('/my-business'))
  }

  render() {                
    return (
      <div className="App">
        <div className="row">
          <Route className="col-3" path="/my-business" render={() => <ListOpportunities onClick={this.selectedOpp.bind(this)} opps={this.state.opps} />} />
          <Route className="col-3" path="/my-business/:opportunityId/notes" render={(props) => <ListNotes {...props} opps={this.state.opps} />} />
          <Route className="col-6" path="/my-business/:opportunityId/notes/:noteId" render={(props) => 
            <EditSubNote {...props} opps={this.state.opps} onChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />
          } />
        </div>
        {/* {this.displayLoader()} */}
     </div>
    );
  }
}

export default Dashboard;
