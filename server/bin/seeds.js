const mongoose = require('mongoose');
require("dotenv").config();
require('../configs/database');

//mongoose.connection.db.dropDatabase('Steeve');

const User = require('../models/user');
const Note = require('../models/note');
const Opp = require('../models/opportunity');
const DataSfdc = require('../models/dataSfdc');
const Account = require('../models/account');




User.remove({}, function(err) { 
  Account.remove({}, function(err) { 
    Opp.remove({}, function(err) {
      Note.remove({}, function(err) {
        var users = [
          {
            firstName: 'Jordan' ,
            lastName: 'Wolf',
            pictureUrl: 'https://www.thewrap.com/wolf-wall-street-isnt-new-10-movies-made-breaking-law-look-totally-worth-photos/1/',             
            email:  "jordan.belfort@",
            company:  'Wall Street Stock Trusty Company',
            myAccountsList : [],
            opportunities : [],
            notes: [],        
            quota :  1200000,
            salesProfile : "Hunter",
            salesDirectorMail : 'salesdirector@wall-street.com',
            salesDirectorName : 'Oliver B.',
            salesVPMail : 'salesVp@wall-street.com',
            salesVPName : 'François M.',
            todoLists : []  
          }]
          
          User.create(users, (err,userDocs)=> {
            console.log ('the users',userDocs, err)            
            var accounts = [{
              SFDCID: 'H7634G67',
              oppName : 'Next great software company',
              alias : 'NGSC',
              _opportunities : [],
              totalOppAmount: 1200000,
              oppLastModificationDate : Date.now(),
              customerContacts : {
                name : 'Important',
                lastName : 'Customer',
                email : 'johndoe@ngsc.com',
                mobileNumber : '0610984567',
                phoneNumber : '',
                position : 'CEO'
              },
            }];  
            
            Account.create(accounts, (err,accounts) => {
              console.log("Acounts Error",err);
              var opp = [
                {
                  SFDCID: "fki84g89",
                  oppName : 'Next great software company',
                  oppAmount:800000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDocs[0]._id,
                  notes : [],
                  // sfdcData : null,
                }
              ]

              Opp.create(opp, (err,opps)=> {
                console.log('Debug',accounts[0])
                console.log('Debug',opps[0])
                console.log("Opp Error",err)
                
                var notes = [{

                  creationDate : new Date("2018-03-02"),
                  modification : [new Date("2018-03-03")],
                  name : 'Call with Project Manager', // make coexist SFDC and own name here
                  currentItemsLabel : ['MEEDIC', 'Timing'], // ex: Pain, Buyer, Decision Process,
                  sfdcItemsLabel : ['Boring filed 1', 'Boring Field 2'],
                  persoItemsLabel : ['Perso label 1', 'Perso Label3'],
                  textInputs:['blablablbalblbalblablablablablab'],  // This is all that is typed by sales Rep
                  sfdcCustomerContacts:[accounts[0]._id],
                  todoLists :[],
                  owner : userDocs[0]._id ,

                }]

                Note.create(notes, (err,notes) => {
                  console.log(" Error otes",err, notes)
                  User.update({_id: userDocs[0]._id},
                    {$push: {
                      myAccountsList: accounts[0]._id,
                      opportunities: opps[0]._id
                    }
                  })
                  .then( (err, usr) => {
                    console.log('usr', err,  opps[0], notes[0])
                    return Opp.update({_id: opps[0]._id}, 
                      {$push: {
                        notes: notes[0]._id
                      }
                    })
                  })
                  .then((err, opp) => {
                    console.log('opp', err, opp)
                    mongoose.disconnect();
                  })
                  
                

                })
              });
            }) 
          });
        })
      })
    }); 
  });

  
  
  
  
  
  
  
  
  