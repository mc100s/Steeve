import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from './api';

import logo from './steve.png';
import './App.css';
import ReactDOM from 'react-dom';


// import MyNotes from './myNotes';
import Home from './home';
import MyBusiness from './myBusiness';
import MySettings from './mySettings';
import Steve from './steve';
// import NoteDetail from './noteDetail';
import Note from './noteDetail';
import Notes from './Notes';
import AddNote from './addNote';

// import Secret from './Settings';

// import Login from './Login';
// import Signup from './Signup';
// import api from '../api';
// import logo from '../logo.svg';


//import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';



class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: []
    }
  }
  // componentDidMount() {
  //   api.getNotes()
  //   .then((resp) => {
  //     console.log('apres', resp)
  //   })
  //   }
 
  
  render() {                
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Steve</h1>
          <Link to="/home">Home</Link>
          <Link to="/myNotes"> My Notes</Link> 
          <Link to="/myBusiness"> My Business</Link>
          <Link to="/mySettings"> Settings</Link>  
          <Link to="/steve"> Steve</Link>  
          
        </header>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/myNotes" component={Notes} />
          <Route path="/myBusiness" component={MyBusiness} />
          <Route path="/mySettings" component={MySettings} />
          <Route path="/steve" component={Steve} />
          <Route path="/addNote" component={AddNote} />
          {/* <Route path={`/note/${this.props.note.name}`} component={noteDetail} /> */}
        </Switch>        
      </div>
    );
  }
}

export default Header;





/*
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }
  componentDidMount() {
    api.getCountries()
    .then(countries => {
      console.log(countries)
      this.setState({
        countries: countries
      })
    })
    .catch(err => console.log(err))
    // // The same thing
    // api.service.get("/countries")
    //   .then(response => {
    //     console.log(response)
    //     this.setState({
    //       countries: response.data
    //     })
    //   })
    //   .catch(err => console.log(err))
  }
  render() {                
    return (
      <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
      <Link to="/">Home</Link> <Link to="/test">Test</Link> <Link to="/countries">Countries</Link> <Link to="/countries/1">Country 1</Link>
      </header>
      <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.    
      </p>
      <Route path="/" exact render={() => <h2>Home</h2>} />
      <Route path="/test" render={() => <h2>Test</h2>} />
      <Route path="/countries" render={() => (
        <div>
        <h2>List of countries</h2>
        {this.state.countries.map((c, i) => <li key={i}>{c.name}</li>)}
        </div>
      )} />
       <Country/>
      </div>
     
    );
  }
}

class Country extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countryName:"",
      capital:"",
      areaCode:"",
      description:""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, value) {
    let newState = {}
    newState[value] =  event.target.value
    console.log(newState)
    this.setState(newState);
    
  }

  handleSubmit(event) {
    api.service.post('/countries',{})
    .then(
      (value) => {
        console.log(value)
        return (value)

      }

    )
    .catch()
  
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
  
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
      Country Name 
      <input type="text" value={this.state.countryName} onChange={(e) => {this.handleChange(e,"countryName")}} />
      </label>
      <label>
      Capital  
      <input type="text" value={this.state.capital} onChange={(e) => {this.handleChange(e,"capital")}} />
      </label>
      <label>
      Area Code 
      <input type="text" value={this.state.areaCode} onChange={(e) => {this.handleChange(e,"areaCode")}} />
      </label>
      <label>
      Description 
      <input type="text" value={this.state.description} onChange={(e) => {this.handleChange(e,"description")}} />
      </label>
      
      <input type="submit" value="Submit" />
      </form>
    )
  }
  
}
*/
