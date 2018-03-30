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
  firstNameLastName: {type:String, required: [true, "My Name"]},
  lastName: {type:String, required: [false, "A lastName is required"]},
  pictureUrl: String,
  email:  {type:String, required: [true, " let's keep in touch, shall we ?"]},
  company:  {type:String, required: [false, "this will be our little secret you know :-)"]},
  phoneNumber :  {type:Number, required: [false, "Your quota is secret and for our statistics only"]},
  todoLists : [{type : mongoose.Schema.Types.ObjectId, ref: 'TodoList' }],

});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'});

module.exports = mongoose.model('Contact', userSchema);
