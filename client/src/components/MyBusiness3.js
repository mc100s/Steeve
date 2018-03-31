import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';
import AddNote from './AddNote';
import LastAccount from './LastAccount';
// import Search from './Search';
import SearchBar from './SearchBar';
// import Viewer from './Viewer';
import ListOpportunities from './ListOpportunities';
import ListNotes from './ListNotes';
import ListLabels from './ListLabels';
import EditSubnote from './EditSubnote';

class MyBusiness3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps : [],
      selectedOpp:'',
      noteTitle:[],
      selectedLabel:'',
      value:''
    } 
    this.selectedOpp = this.selectedOpp.bind(this)
    this.getFilteredNote = this.getFilteredNote.bind(this)
  };

  selectedOpp = (event) =>{
    this.setState({selectedOpp:event})
    console.log('selectedopp',event)
    this.getFilteredNote(event)
  }

  componentDidMount() {
    api.getOpps()
    .then((resp) => {
      this.setState({
        opps: resp
      })
      console.log('Opps',resp)
    })
  }

  getFilteredNote=(oppId)=> {
    console.log('opp',oppId)
    let temp=[];
    let noteTitle=[];
      for (let i = 0; i < this.state.opps.length; i++) {
        if (oppId === this.state.opps[i]._id) {
          for (let j = 0; j < this.state.opps[i].notes.length; j++) {
            console.log('export array',this.state.opps[i].notes[j])
            noteTitle.push({name:this.state.opps[i].notes[j].name,id:this.state.opps[i].notes[j]._id})
              console.log('export des titres',noteTitle)
              // temp.filter((note)=> {
              //   <div>{note.name}s</div>
              // })

            // this.state.opps[i].notes[j].name = this.state.opps[i].notes[j].name
            // notesData[j].name =  this.state.opps[i].notes[j].name
            // notesData.push(this.state.opps[i].notes[j].textInputs)
            
          }
        }
      }
      // console.log('debug',notesData)
      this.setState({noteTitle:noteTitle})
      return(noteTitle)
  }

   render() {                
    return (
      <div className="row">
        <div className='col-3 FirsttBar'>
          <ListOpportunities onClick={this.selectedOpp} opps={this.state.opps}/>
        </div>

        <div className='col-3 SecondtBar'>
        <ListNotes notes={this.state.noteTitle}/>
        </div>
        <div className='col-3 ThirdBar'>
        </div>

        <div className='col-3 FourthBar'>
        </div>

      </div>
   )}

}

export default MyBusiness3;





// class MyBusiness3 extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       searchInput:'',
//       notes:[],
//       accounts:[],
//       opps : [],
//       value:''
//     } 
//     this.handleInputChange = this.handleInputChange.bind(this)
//   };
  
//   componentDidMount() {
//     api.getAccounts()
//     .then((resp) => {
//       this.setState({
//         accounts: resp
//       })
//     });
//     api.getNotes()
//     .then((resp) => {
//       this.setState({
//         notes: resp
//       })
//       console.log(resp)
//     })
//     api.getOpps()
//     .then((resp) => {
//       this.setState({
//         opps: resp
//       })
//       // console.log('Opps',resp)
//     })
//   }
  
//  handleInputChange(event){
//   this.setState({
//       searchInput: event.target.value,
//       value: event.target.value
//     })
//   }

//   getFitleredNotes() {
//     let filteredNotes = []
//     for (let i = 0; i < this.state.notes.length; i++) {
//       if (this.state.notes[i].name.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
//         filteredNotes.push(this.state.notes[i])
//       }
//     }
//     return filteredNotes;
//   }
  
//   render() {                
//     return (
//       <div>
//       <LastAccount/>
//       <div>
//       <button onClick={() => {
//         api.createNote()
//         .then((resp) => {
//           this.props.history.push('/notes/'+resp._id) // fait un redurect vers une nouvelle route
//         })
//       }}
//       >Add Note</button>
//       <form>
//         <label> Search
//           <input type="text"
//           placeholder="Account, Opp, Note"
//           value={this.state.value}
//           onChange={this.handleInputChange}
//           />
//         </label>
//         {/* <p>{this.state.searchInput}</p> */}
//         <div>{this.getFitleredNotes().map((note) => {
//           return <Link to={'/note'+note._id} >{note.name}</Link>
//         })}</div>
//       </form>
//       {/* <Viewer result={() =>{this.handleInputChange}}/> */}
//       </div>
//       </div>
//     )
//   }
// }

// class MyBusiness2 extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       notes: [],
//       searchInput : '',
//       searchResult:[]
//     } 

//     this.handleClick = this.handleClick.bind(this);
//   };

//   handleClick(e) {
//     console.log('submitted')
//   }


//   render() {                
//     return (
//       <div>
//       <LastAccount/>
//       <div>
//       <button onClick={() => {
//         api.createNote()
//         .then((resp) => {
//           this.props.history.push('/notes/'+resp._id) // fait un redurect vers une nouvelle route
//         })
//       }}
//       >Add Note</button>
//       {/* <SearchBar onChangeJulien={(value)=> this.setState({searchInput:value})} />  */}
//       </div>
//       <form onSubmit={this.handleSubmit}>
//           <label>
//           <input placeholder='Account, Opp or Note' type="text" value={this.state.value} onChange={(event)=> {this.props.onChangeJulien(event.target.value)}} onclick={this.handleClick}/>
//           </label>
//           <input type="submit" value="Submit" /> 
//         </form>
//       </div>
//     )
//   }
// }


