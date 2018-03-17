const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;
const Account = require('./account');
// const opp = require('./opp');
const Note = require('./note');
const dataSfdc = require('./dataSfdc');
const todoList = require('./todoList');

const userSchema = new Schema({
  firstName: {type:String},
  lastName: {type:String, required: [true, "A lastName is required"]},
  pictureUrl: String,
  // usertype : XXXX,
  email:  {type:String, required: [true, " let's keep in touch, shall we ?"]},
  company:  {type:String, required: [false, "this will be our little secret you know :-)"]},
  quota :  {type:Number, required: [false, "Your quota is secret and for our statistics only"]},
  salesProfile : ["I hunt !", "I farm !", "it is complicated"],
  salesDirectorMail : {type:String, required: [false, ""]},
  salesDirectorName : {type:String, required: [false, ""]},
  salesVPMail : {type:String, required: [false, ""]},
  salesVPName : {type:String, required: [false, ""]},
  // team : {type:String, required: [false, ""]},
  // Partners : XX,
  todoLists : [{type : mongoose.Schema.Types.ObjectId, ref: 'TodoList' }],
  myAccountsList : [{type : mongoose.Schema.Types.ObjectId, ref: 'Account' }],


});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'});

module.exports = mongoose.model('User', userSchema);


// enum: ['pending', 'granted', 'killed']
//createdAt: {
//   type: String,
//   default: new Date(),
// },
// updatedAt: {
//   type: String,
//   default: new Date(),


// timestamps: true
