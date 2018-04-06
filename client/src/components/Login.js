import React, { Component } from 'react';
import api from '../api';

class Login extends Component {
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
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div className="Login">
        {/* <h2>Login</h2>
        <form>
          Email: <input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} /> <br/>
          Password: <input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}}  /> <br/>
          <button onClick={(e) => this.handleClick(e)}>Login</button>
        </form> */}

        <div className="card card-signup">

          <form className="form" method="" action="">
              <div className="card-header card-header-primary text-center">
                  <h4>Login</h4>
                  {/* <div className="social-line">
                      <a href="#pablo" className="btn btn-link btn-just-icon">
                          <i className="fa fa-facebook-square"></i>
                      </a>
                      <a href="#pablo" className="btn btn-link btn-just-icon">
                          <i className="fa fa-twitter"></i>
                      </a>
                      <a href="#pablo" className="btn btn-link btn-just-icon">
                          <i className="fa fa-google-plus"></i>
                      </a>
                  </div> */}
              </div>
              {/* <p className="text-divider">Or Be ClassNameical</p> */}
              <div className="card-body">
                  <span className="bmd-form-group"><div className="input-group">
                      <span className="input-group-addon">
                          <i className="material-icons">email</i>
                      </span>
                      <input value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} type="email" className="form-control" placeholder="  Email..."/>
              </div>
                  </span>
                  <span className="bmd-form-group"><div className="input-group">
                      <span className="input-group-addon">
                          <i className="material-icons">lock_outline</i>
                      </span>
                      <input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} className="form-control" placeholder="  Password..."/>
                  </div></span>
                  {/* <!-- If you want to add a checkbox to this form, uncomment this code

                <div className="form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" value="">
                        Subscribe to newsletter
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div> --> */}
              </div>
                <div className="card-footer justify-content-center">
                <button className='btn btn-primary'onClick={(e) => this.handleClick(e)}>Login</button>
                    
                </div>
          </form>

        </div>
      
      </div>
    );
  }
}

export default Login;