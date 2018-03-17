const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Account = require('./account');
const Opp = require('./opportunity');
const dataSfdc = require('./dataSfdc');
const todoList = require('./todoList');

const noteSchema = new Schema({

  creationDate : Date,
  modification : [Date],
  name : String, // make coexist SFDC and own name here
  currentItemsLabel : [String], // ex: Pain, Buyer, Decision Process,
  sfdcItemsLabel : [String],
  persoItemsLabel : [String],
  textInputs:[String],  // This is all that is typed by sales Rep
  todoLists :[{type : mongoose.Schema.Types.ObjectId, ref: 'todoList' }],
  owner : {type : mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Items from Sprocess
  // NEw items added by sales rep
  //contacts attached to the note
  // text inputs
  //Time spent in metting = >start Button
  

});



module.exports = mongoose.model('Note', noteSchema);

/*
  name: {
    type: String,
    required: [true, 'The country name is required']
  },
  capitals: {
    type: [String],
    default: []
  },
  area: {
    type: Number,
  },
  description: {
    type: String,
  },
});
*/