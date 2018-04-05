import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput:'',
      notes:[],
      value:''
    } 
    this.handleInputChange = this.handleInputChange.bind(this)
  };

  handleInputChange(event){
    this.setState({
        searchInput: event.target.value,
        value: event.target.value
      })
    }

  render() {                
    return (
      <div>
      <form>
        <label> Search
          <input type="text"
            placeholder="Account, Opp, Note"
            value={this.props.search}
            onChange={(e)=> {this.props.handleSearch(e)}}
          />
        </label>
        </form>
      </div> 
    )
  }
}

export default Search;