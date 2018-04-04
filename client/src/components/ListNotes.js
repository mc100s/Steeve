import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';

class ListNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps : [],
      selectedOpp:'',
      selectedNote:'',
      datas:''
    } 
    
  };


   render() {
    this.opportunityId = this.props.match.params.opportunityId;
    for (let i = 0; i < this.props.opps.length; i++) {
      if (this.props.opps[i]._id === this.opportunityId) {
        this.selectedOpp = this.props.opps[i]
      }
    }                
    return (
      <div className="col-3"> 
        <button onClick={() => this.props.handleNewNote(this.props.match.params.opportunityId)}>Add Note</button>
          {this.selectedOpp && this.selectedOpp.notes.map((note)=> {
            return (
              <ol>
                <li><Link to={`notes/${note._id}`} onClick={()=> {console.log('clicked')}}>{note.name}</Link></li>
              </ol>
            )
          })
        }
      </div>
   )}
}

export default ListNotes;