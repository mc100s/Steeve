//datas imported from SFDC

const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
// const opp = require('./opp');
const Note = require('./note');
const dataSfdc = require('./dataSfdc');
const todoList = require('./todoList');

const accountSchema = new Schema({
    SFDCID: String,
    alias : String,
    _opportunities : [{type : mongoose.Schema.Types.ObjectId, ref: 'Opportunity' }],
    totalOppAmount: Number,
    // oppTeam : [{type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    oppLastModificationDate : Date,
    // Add here everything needed from SFDC
    customerContacts : [{
        name : String,
        lastName : String,
        email : String,
        mobileNumber : String,
        phoneNumber : String,
        position : String,
     }],
    
    
});



module.exports = mongoose.model('Account', accountSchema);