//datas imported from SFDC

const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Account = require('./account');
// const opp = require('./opp');
const Note = require('./note');
const todoList = require('./todoList');

const dataSfdcSchema = new Schema({
  SFDCID: Number,
  name : {type:String, required: [false, "What's my name dear?"]},
  accountName : String,
  oppAmount:Number,
  oppClosingDate : Date,
  oppLastModificationDate : Date,
  // Add here everything needed from SFDC
    // oppTeam : TEAM_id,
});



module.exports = mongoose.model('dataSfdc', dataSfdcSchema);