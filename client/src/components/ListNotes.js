import React, { Component } from 'react';
import { Route, Link, Switch, NavLink } from 'react-router-dom';
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
      <div className="ListNotes"> 
        <button className="btn btn-rose btn-round"
        onClick={() => this.props.handleNewNote(this.props.match.params.opportunityId)}><i class="material-icons">add</i> Add Note</button>
          {this.selectedOpp && this.selectedOpp.notes.map((note)=> {
            return (
              <NavLink className='btn opportunity-link btn-outline-primary'  key={note._id} to={`/my-business/${this.opportunityId}/notes/${note._id}`} onClick={()=> {console.log('clicked')}}>{note.name}</NavLink>
            )
          })
        }
      </div>
   )}
}

export default ListNotes;