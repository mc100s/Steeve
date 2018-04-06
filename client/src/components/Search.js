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
      <div className='Search-left'>
      <form>
        
        <i class="material-icons">search</i>
        <textarea  value={this.props.search} onChange={(e)=> {this.props.handleSearch(e)}} type="text" className="form-control rose col-6" rows='1'></textarea>
          {/* <input type="text"
            placeholder="Account, Opp, Note"
            value={this.props.search}
            onChange={(e)=> {this.props.handleSearch(e)}}
          /> */}
  
        </form>
      </div> 
    )
  }
}

export default Search;