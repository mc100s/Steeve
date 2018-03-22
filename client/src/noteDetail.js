import React, { Component, Switch } from 'react';
import { Route, Link } from 'react-router-dom';
import api from './api';
import logo from './logo.svg';
import './App.css';


class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {myNotes:[]
    }
  }
  componentDidMount() {
    api.getNotes()
    .then((resp) => {
      // console.log('mes notes', resp)
      this.setState({
        myNotes:resp
      })
      
      // console.log('this state', this.state)
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  
  render() {
    return (
      
      <div>
        {console.log(this.state.myNotes)}
        {this.state.myNotes.map(notes =>
        <h4>{notes.name}</h4>
        )}
      <NoteDetail notes={this.state.myNotes} /> 

        {/* {console.log(this.state.myNotes)} */}
      {/* {this.state.myNotes.map(notes => {
        return(
          <div>
            {console.log('notes',notes)}
          <NoteDetail notes={notes} notesId={notes._id}/>
          </div>
        )
      })} */}

      </div>
    )
  }
}


class NoteDetail extends Component {
  constructor(props) {
        super(props)
        this.state = {myNotes:[]
        }
      }

      render() {                
            return (
              <div>     
                {console.log('proooops',this.props.notes)}
              </div>
            )
          }

}
// class NoteDetail extends Component {
  
//   constructor(props) {
//     super(props)
//     this.state = {myNotes:[]
//     }
//   }
  
//   render() {                
//     return (     
//         {console.log(this.props.notesId)}
//     )
//   }

      // <div className="App">
      
      // {this.props.notesId.map(
      //     notes => {
      //       return(
      //         <div>
      //         <h4>{notes.name}</h4>
      //         <h4>{notes.textInputs.map(textInput => {
      //           return (
      //             <h6>{textInput.label}</h6>
                  
      //           )}
      //         )}
      //         </h4>
            
      //       </div>
      //     )
      //   }
 
      
      
//       {console.log('notes',this.state.myNotes)}
//       {this.state.myNotes.map(notes => {
//         return (
//           <div>
//           <Link to={`/note/${notes.name}`}>{notes.name}</Link>
          
//           <Switch>
//           <Route path={`/note/${notes.name}`} component={NoteDetail} />
//           </Switch>   
          
          
//           {/* <h4>{notes.sfdcItemsLabel}</h4>
//         <h4>{notes.sfdcItemsLabel}</h4> */}
//         {/* <h6>{notes.sfdcItemsLabel}</h6>
//       <h6>{notes.textInputs}</h6> */}
//       </div>
//     )
//   })}
  
  
  
  
//   {/* <h4 className="Note-title"><Link to={`/note/${this.props.note.name}`}>{this.props.note.name}</Link></h4> */}
  
//   </div>
// )}
// }



export default Note;

// {/* // export class MyNotes extends Component { */}
// {/* //   constructor(props) { */}
// //     super(props)
// //     this.state = {
// //       notes: [],
// //       currentNote : []
// //     }
// //   }
// //   componentDidMount() {
// //     api.getNotes()
// //     .then((resp) => {
// //       console.log('apres', resp)
// //       this.setState({
// //         notes: resp
// //       })
// //     })
// //   }

// //   render() {                
// //     return (
// //       <div className="App">
// //       <h2>Mes notes : {this.state.notes.map((note)=>{
// //         return (<NoteCard note={note}></NoteCard>)
// //       })}
// //       </h2>
// //       </div>
// //     );
// //   }
// // }


// // class Note extends Component {
// //   constructor(props) {
// //     super(props)
// //     this.state = {
// //       note_id: '',
// //       name:'',
// //       currentItemsLabel : [],
// //       sfdcItemsLabel: [],
// //       persoItemsLabel : [],
// //       textInputs:[{}],
// //       todoLists : [],
// //       owner: [],
// //       // textInputs:[{label:String, text:String}],  // This is all that is typed by sales Rep
// //     }
// //   }


// //   componentDidMount() {
// //     api.createNote()
// //     .then((resp) => {
// //       console.log('note', resp)
// //       this.setState({ 
// //         note_id : resp._id,
// //         name:resp,
// //         currentItemsLabel : [],
// //         sfdcItemsLabel: [],
// //         persoItemsLabel : [],
// //         textInputs:[{}],
// //         todoLists : [],
// //         owner: [],

// //       })
// //     })
// //   }



// //   render() {                
// //     return (
// //       <div>
// //       <p>MyBusiness</p>
// //       </div>
// //     );
// //   }
// // }

// // export class AddNote extends Component {
// //   constructor(props) {
// //     super(props)
// //     this.state = {
// //       note_id: ''
// //     }
// //   }   

// //   componentDidMount() {
// //     api.createNote()
// //     .then((resp) => {
// //       console.log('note', resp)
// //       this.setState({ 
// //         note_id : resp
// //       })
// //     })
// //   }


// //load note template
// //load layers
// //show input field
// //Autosave every 60 secs


// //   render() {                
// //     return (
// //       <div>
// //       <p>MyBusiness</p>
// //       </div>
// //     );
// //   }
// // }
