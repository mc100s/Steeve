import React, { Component, Switch } from 'react';
import { Route, Link } from 'react-router-dom';
import api from '../api';
import NoteDetail from './NoteDetail';


class NoteCard extends Component {
  
  
  render() {                
    return (
      <div className="App">
      <h4 className="Note-title"><Link to={`/note/${this.props.note.name}`}>{this.props.note.name}</Link></h4>
      <NoteDetail/>
      {/* <Switch>
        <Route path={`/note/${this.props.note.name}`} component={Home} />
      </Switch>   */}
    </div>
  );
}
}
export class MyNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      currentNote : []
    }
  }
  componentDidMount() {
    api.getNotes()
    .then((resp) => {
      console.log('apres', resp)
      this.setState({
        notes: resp
      })
    })
  }

  render() {                
    return (
      <div className="App">
      <h2>Mes notes : {this.state.notes.map((note)=>{
        return (<NoteCard note={note}></NoteCard>)
      })}
      </h2>
      </div>
    );
  }
}


class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note_id: '',
      name:'',
      currentItemsLabel : [],
      sfdcItemsLabel: [],
      persoItemsLabel : [],
      textInputs:[{}],
      todoLists : [],
      owner: [],
      // textInputs:[{label:String, text:String}],  // This is all that is typed by sales Rep
    }
  }
  
  
  componentDidMount() {
    api.createNote()
    .then((resp) => {
      console.log('note', resp)
      this.setState({ 
        note_id : resp._id,
        name:resp,
        currentItemsLabel : [],
        sfdcItemsLabel: [],
        persoItemsLabel : [],
        textInputs:[{}],
        todoLists : [],
        owner: [],
        
      })
    })
  }
  
  
  
  render() {                
    return (
      <div>
      <p>MyBusiness</p>
      </div>
    );
  }
}



export default MyNotes