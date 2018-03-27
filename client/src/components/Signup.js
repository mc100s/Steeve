import React, { Component } from 'react';
import api from '../api';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    console.log("handleClick");
    
    e.preventDefault()
    api.signup({email: this.state.email, password: this.state.password})
      .then(result => {
        console.log('SUCCESS!', this.state.email, this.state.password)
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div className="signup">
        <h2>signup</h2>
        <form>
          Email: <input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} /> <br/>
          Password: <input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}}  /> <br/>
          <button onClick={(e) => this.handleClick(e)}>signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;