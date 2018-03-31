import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';


class ListOpportunities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps : [],
      selectedOpp:'',
      selectedNote:'',
      selectedLabel:'',
      value:''
    } 
  };
  
   render() {                
    return (
      <div>
        <div className='FirstBar'>
          <ul> 
            {this.props.opps.map((opp) => {
              return (
                <li  
                ><Link key={opp._id} onClick={()=>{this.props.onClick.bind(this)}}to={`/my-business/${opp._id}/notes`}>{opp.oppName}</Link></li>
              )
            })}
          </ul>
        </div>
      </div>
   )}

}

export default ListOpportunities;




// onClick={() =>{
//   this.setState({
//     selectedOpp : this.opps._id
//   })
//   console.log(this.opps._id)
// }

// }


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


