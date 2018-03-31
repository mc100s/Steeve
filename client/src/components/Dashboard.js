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
      noteTitle:''
    }
    // this.selectedOpp = this.selectedOpp.bind(this)
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
  
  render() {                
    return (
      <div className="App">
        <div className="row">
          <Route className="col-3" path="/my-business" render={() => <ListOpportunities onClick={this.selectedOpp.bind(this)} opps={this.state.opps} />} />
          <Route className="col-3" path="/my-business/:opportunityId/notes" render={(props) => <ListNotes {...props} opps={this.state.opps} />} />
          <Route className="col-6" path="/my-business/:opportunityId/notes/:noteId" render={(props) => <EditSubNote {...props} opps={this.state.opps} />} />
        </div>
     </div>
    );
  }
}

export default Dashboard;
