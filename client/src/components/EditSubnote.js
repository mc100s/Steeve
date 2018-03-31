import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';

class EditSubNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps : [],
      selectedOpp:'',
      selectedNote:'',
      selectedLabel:'',
      didItChanged: false,
      value:'',
      currentNote : {
        name : 'New Note',
        persoItemsLabel : [],
        textInputs: [
          {
            label : 'Metrics',
            text : "" 
          },
          {
            label : 'Economic Buyer',
            text : "" 
          },
          {
            label : 'Decision Criteria',
            text : "" 
          },
          {
            label : 'Decision Process',
            text : "" 
          },
          {
            label : 'Identify Pain',
            text : "" 
          },
          {
            label : 'Champion',
            text : "" 
          },
          {
            label : 'General',
            text : "" 
          }         
        ],
        todolists : []
      },
      currentLabel : '',
      currentItemsLabel : ['General'],
      sfdcItemsLabel :  [],
      didItChanged : false,
      didTitleChanged : false,
      title: '',
      currentInput:''
    
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleText = this.handleText.bind(this)
    setInterval(this.autoSave.bind(this), 3000);
  } 

  // componentDidMount() {
  //   this.setState({
  //     currentNote.textInputs[0].text: this.selectedOpp.notes.textInput[0].text
  //       })
  // }

  autoSave(){
    console.log('setintervall')
    if (this.state.didItChanged) {
      api.updateNote(this.props.match.params.id,this.state.currentNote)
      console.log('saved')
      this.setState({
        didItChanged: false
      })
    }
  }
  
  handleText(e){
    this.setState({
      didItChanged: true
    }) 
    
    let newText = e.target.value;
    console.log(newText)
    this.setState({
      currentInput: newText
    });
    let p = 0;
    let newTextInputs = this.state.currentNote.textInputs.slice();
    for (let i = 0; i <this.state.currentNote.textInputs.length; i++) {
      if (newTextInputs[i].label === this.state.currentLabel) {
        p = i
      }
    }
    newTextInputs[p].text =  newText
    this.setState({
      textInputs: newTextInputs
    })
  }


  handleInputChange(event){
    this.setState({
      searchInput: event.target.value,
      value: event.target.value
    })
  }
  
  getFitleredNotes() {
    let filteredNotes = []
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].name.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
        filteredNotes.push(this.state.notes[i])
      }
    }
    return filteredNotes;
  }
  
  render() {      
    this.opportunityId = this.props.match.params.opportunityId;
    for (let i = 0; i < this.props.opps.length; i++) {
      if (this.props.opps[i]._id === this.opportunityId) {
        this.selectedOpp = this.props.opps[i]
      }
    }                       
    return (
      <div>
        <br/>
          {console.log(this.selectedOpp)}
          {this.selectedOpp && this.selectedOpp.notes.map((note)=> {
              return (
                <div>
                  <p className=''>{note.textInputs.map((textInput)=> (
                        <form onSubmit={null}>
                        <label>
                          
                          <form>
                            <div class="form-group">
                              <label for="exampleInput1" class="bmd-label-floating">{textInput.label}</label>
                              <input value={textInput.text} onChange={(e) => this.props.onChange(e, this.opportunityId, note._id, textInput.label)} type="text" class="form-control" id="exampleInput1"/>
                            </div>
                          </form>
                          {/* <input type="text" value={textInput.text} onChange={this.handleText.bind(this)} /> */}
                        </label>
                  </form>
                      
                      
                      
                      
                      // <li>{textInput.label} :
                      //  <textarea  value={this.state.value} onChange={this.handleText.bind(this)}></textarea>
                      // <strong>{textInput.text}</strong></li>
                    )
                  )}</p>
                </div>
              )
            })}

        <form>
          <div class="form-group">
            <label for="exampleInput1" class="bmd-label-floating">With Floating Label</label>
            <input type="text" class="form-control" id="exampleInput1"/>
          </div>
        </form>
      </div>
    )
  }
}
  
  export default EditSubNote;

  

  // <form onSubmit={null}>
  //       <label>
  //         {textInput.label}
  //         <input type="text" value={this.state.value} onChange={this.handleText.bind(this)} />
  //       </label>
  // </form>