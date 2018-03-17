const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Account = require('./account');
// const opp = require('./opp');
const Note = require('./note');
const dataSfdc = require('./dataSfdc');

const todoListSchema = new Schema({
    title : String,
    description : String,
    todoEndData : Date,
    items : [
        {
            title : String,
            description : String,
            endDate : Date,
            teamInvolved : [{type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
            Privacy : [],
            color : Number,
            customerContactsExpectingThisItem : []
        }
    ]

  
  

});



module.exports = mongoose.model('todoList', todoListSchema);