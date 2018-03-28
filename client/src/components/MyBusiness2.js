import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';
import AddNote from './AddNote';
import LastAccount from './LastAccount';
// import Search from './Search';
import SearchBar from './SearchBar';

class MyBusiness2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      searchInput : '',
      searchResult:[]
    } 
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  };

  // onChange(e) {
  //   this.setState({searchInput: e.target.value});
// }
// getResults() {
//     calltodb(searchText).then(e => {
//         this.setState({searchResults: e.value})
//     });
// }

  render() {                
    return (
      <div>
        <LastAccount/>
        <div>
        <button onClick={() => {
        api.createNote()
        .then((resp) => {
          this.props.history.push('/notes/'+resp._id) // fait un redurect vers une nouvelle route
        })
      }}
      >Add Note</button>
      <SearchBar searchInput={this.searchInput} onChangeJulien={(value)=> this.setState({searchInput:value})} /> 
      {/* rajouter le on change ici sur le state local onChangeJulien={(value)=> this.setStare({searchInput:value})} */}
      
        </div>
      </div>
    )
  }
}

  export default MyBusiness2;