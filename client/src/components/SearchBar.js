import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';
import AddNote from './AddNote';
// import Search from 'react-search-box';


class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    } 
     this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {console.log('clicked')}

  render() {                
    return (
      <div> 
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="name" />
          </label>
            <input value={this.state.value} onChange={(event)=> {this.props.onChangeJulien(event.target.value)}} type="submit" value="Search" onclick={this.handleClick}/>
        </form>

      </div>
    )
  }
}


  export default SearchBar;

    
  // handleText(e){
  //   this.setState({
  //     didItChanged: true
  //   }) 
    
  //   let newSearch = e.target.value;
  //   this.setState({
  //     value: newSearch
  //   });
  //   let p = 0;
  //   for (let 
  //   let newTextInputs = this.state.currentNote.textInputs.slice();
  //   for (let i = 0; i <this.state.currentNote.textInputs.length; i++) {
  //     if (newTextInputs[i].label === this.state.currentLabel) {
  //       p = i
  //     }
  //   }
  //   newTextInputs[p].text =  newSearch
  //   this.setState({
  //     textInputs: newTextInputs
  //   })
  // }