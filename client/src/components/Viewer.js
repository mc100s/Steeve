import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';

let temp = []

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: []
    } 
  };
  
  componentDidMount() {
    api.getNotes()
    .then((resp) => {
      console.log('reeeeesp',resp)
      this.setState({
        note: resp
      })
    });
  }
  render() {                
    return (
      <div> 
      <span>
          {/* {this.state.note.map(
            (result) =>{
              forEach( 
                if (result._id ===this.props.result._id) {
                  temp.push()

                }
              
              )
            }
          ) 
          } */}
        </span>
        </div>
      )
    }
  }
    export default Viewer;