const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Account = require('./account');
const Note = require('./note');
const dataSfdc = require('./dataSfdc');
const todoList = require('./todoList');

const OppSchema = new Schema({
  SFDCID: String,
  oppName : {type:String, required: [false, "What's my name dear?"]},

  oppAmount:Number,
  oppClosingDate : Date,
  // oppTeam : {type : mongoose.Schema.Types.ObjectId, ref: 'User' },
  oppLastModificationDate : Date,
  owner : {type : mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes : [{type : mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  sfdcData : {type : mongoose.Schema.Types.ObjectId, ref: 'dataSfdc' },
});

module.exports = mongoose.model('Opportunity', OppSchema);