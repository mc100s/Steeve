import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';
import AddNote from './AddNote';

class ShowNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      currentCompanyId : this.props.route._id
    } 
  }
  componentDidMount() {
    api.getNotes()
    .then((resp) => {
      this.setState({
        notes: resp
      })
      // console.log(resp)
    })
  }





}





class NoteCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    } 
  };
  
  goodData(notes) {
    let dataOk = []
    for (let i = 0; i<notes.textInputs.length; i++) {
      dataOk.push((<div><div>{notes.textInputs[i].label}:{notes.textInputs[i].text}</div></div>))
    }
    return dataOk
  }
  
  render() {                
    return (
      <div className="App">
      <h3>{this.props.note.name}</h3>
      <h4>{this.goodData(this.props.note)}</h4>
      </div>
    )
  }
}

class Notes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
  }
  componentDidMount() {
    api.getNotes()
    .then((resp) => {
      this.setState({
        notes: resp
      })
      // console.log(resp)
    })
  }
  
  
  render() {                
    return (
      <div className="App">
      <br/>
      
      <button onClick={() => {
        api.createNote()
        .then((resp) => {
          this.props.history.push('/notes/'+resp._id) // fait un redurect vers une nouvelle route
        })
      }}
      >Add Note</button>
      
      <div>{this.state.notes.map((note)=>{
        return (<NoteCard note={note}></NoteCard>)
      })}
      <Account/>
      </div>
      </div>
    );
  }
}

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      currentCompanyId:''
    } 
  };
  
  componentDidMount() {
    api.getAccounts()
    .then((resp) => {
      this.setState({
        accounts: resp
      })
    })
    console.log('ACCoUNTS', this.state.accounts)
  }
  

  render() {                
    return (
      <div className="App">
      <h3>{this.state.accounts.map((accounts) =>{
        return (
          <div>
            <h2><Link to={`${accounts._id}`}>{accounts.company}</Link></h2>
              <Switch>
                <Route path={`${accounts._id}`} components={{Notes: accounts._id}} />  
              </Switch>
          </div>
        )
      })
      }
      </h3>
      
      </div>
  )
  }
}




// <Route path="latest" components={{sidebar: Sidebar, content: ContentLayout}} />
// Then in an appropriate component I can reference components through props:

// {this.props.sidebar}
// {this.props.content}
// But without react-router I would do this, I can pass my component custom props:

// <Sidebar names={ ['foo', 'bar'] } isOpen={true} num={10} />
// <ContentLayout type={ contentType } background={'#fff'} title={titleOne} />


// hi @wzup I just got this very problem and I noticed that in the child component i have this.props.route which, in your example you could do (I think):

// <Route path="latest" components={{sidebar: Sidebar, content: ContentLayout}} something="foo" />
// And in, let's say Sidebar you should be able to do:

// this.props.route.something


export default ShowNote;





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
