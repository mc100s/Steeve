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
        var user = new User(
          {
            firstName: 'Julien' ,
            lastName: 'Bloch',
            pictureUrl: 'http://static8.viadeo-static.com/bB9M-cz_KBxmn29pUd_7-zwhkrA=/300x300/member/0023jt2vy098k5j?ts=946681200000',             
            email:  "blochjulien@hotmail.com",
            company:  'Sales Companion Company',
            myAccountsList : [],
            opportunities : [],
            notes: [],        
            quota :  1200000,
            salesProfile : "Hunter",
            salesDirectorMail : 'salesdirector@spc.com',
            salesDirectorName : 'Oliver B.',
            salesVPMail : 'salesVp@spc.com',
            salesVPName : 'François M.',
            todoLists : []  
          } ) 
          
          User.register(user, "julien", (err, userDoc)=> {

            console.log ('the userDoc', userDoc)            
            var accounts = [
            {
              SFDCID: 'ko9090ght',
              alias : 'Leclerc',
              name: 'Leclerc',
              logo: 'https://www.creads.fr/blog/wp-content/uploads/2012/10/header-leclerc-1.png',
              links : ['http://www.e-leclerc.com/'],
              _opportunities : [],
              totalOppAmount: 3000000,
              oppLastModificationDate : Date.now(),
              customerContacts : {
                name : 'Julien ',
                lastName : 'Frachon',
                email : 'jfrachon@leclcerc.com',
                mobileNumber : '0610984567',
                phoneNumber : '',
                position : 'CEO'
              },
            },
            {
              SFDCID: 'kh45kjsje5',
              alias : 'VP',
              name: 'Vente-Privée',
              logo: 'data:image/png;base64,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',
              links : ['http://www.vente-privee.com/refNat/images/presentation-2.jpg'], 
               _opportunities : [],
              totalOppAmount: 1000000,
              oppLastModificationDate : Date.now(),
              customerContacts : {
                name : 'Jacques-Antoine',
                lastName : 'Grangon',
                email : 'ja-grangon@vp.com',
                mobileNumber : '0610984567',
                phoneNumber : '',
                position : 'Founder'
              },
            },
            {
              SFDCID: '09bf66tty',
              alias : 'SOCGEN',
              name: 'Société Générale',
              logo: 'https://banque.meilleurtaux.com/images/actu/logos/societe-generale-logo.png',
              links : ['https://www.societegenerale.fr/'],
              _opportunities : [],
              totalOppAmount: 10000000,
              oppLastModificationDate : Date.now(),
              customerContacts : {
                name : 'Ouéda ',
                lastName : 'Fréderic',
                email : 'fouda@socgen.com',
                mobileNumber : '0610984567',
                phoneNumber : '',
                position : 'CEO'
              },
            }

          ];  
            
            Account.create(accounts, (err,accounts) => {
              console.log("Acounts Error",err);
              var opp = [
                {
                  SFDCID: "fki84g89",
                  oppName : 'Leclerc - Moving to The Cloud',
                  oppAmount:1200000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDoc._id,
                  notes : [],
                },
                {
                  SFDCID: "fki84g89",
                  oppName : 'Leclerc - Product Data Management',
                  oppAmount:100000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDoc._id,
                  notes : [],
                },
                {
                  SFDCID: "fki84g89",
                  oppName : 'Leclerc - Alpha Architecture',
                  oppAmount:800000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDoc._id,
                  notes : [],
                },
                {
                  SFDCID: "fki84g88",
                  oppName : "Vente-Privée - Cleaning User's Data",
                  oppAmount:120000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDoc._id,
                  notes : [],
                },
                {
                  SFDCID: "fki84g88",
                  oppName : "Vente-Privée - Improve CrossCanal UX",
                  oppAmount:120000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDoc._id,
                  notes : [],
                },
                {
                  SFDCID: "fki84g88",
                  oppName : "Vente-Privée - Mobile First IT Transformation",
                  oppAmount:120000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDoc._id,
                  notes : [],
                },
                {
                  SFDCID: "fki84g87",
                  oppName : "Société Générale - Merging old ERP's",
                  oppAmount:1200000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDoc._id,
                  notes : [],
                },
                {
                  SFDCID: "fki84g87",
                  oppName : "Société Générale - Resizing Infrastructure",
                  oppAmount:1200000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDoc._id,
                  notes : [],
                },
                {
                  SFDCID: "fki84g87",
                  oppName : "Société Générale - Opening Asian MArket",
                  oppAmount:1200000,
                  oppClosingDate : new Date("2018-04-07"),
                  oppLastModificationDate : new Date("2018-03-02"),
                  owner : userDoc._id,
                  notes : [],
                }
              ]

              Opp.create(opp, (err,opps)=> {
                // console.log('Debug',accounts[0])
                console.log('Debug',opps[0])
                console.log("Opp Error",err)
                
                var notes = [
                  {

                  creationDate : new Date("2018-03-02"),
                  modification : [new Date("2018-03-03")],
                  name : 'First Meeting with CEO', // make coexist SFDC and own name here
                  currentItemsLabel : ['Metrics', 'Economic Buyer', 'Decision Criteria', 'Decision Process', 'Identified Pain', 'Champion'], // ex: Pain, Buyer, Decision Process,
                  sfdcItemsLabel : ['Pains', 'Metrics', 'EB'],
                  persoItemsLabel : ['Personnal Win', 'Hate Somebody'],
                  textInputs:[{
                    label : 'Metrics', 
                    text:'Daily Dowtime 30 minutes'
                  }, 
                  {
                    label:'Economic Buyer', 
                    text:'The super busy CEO off course !'
                  },
                  {
                    label:'Decision Criteria', 
                    text:"Money, timing, Team's adoption'"},
                    {
                      label : 'Decision Process', 
                      text:'RFP then Proof of Concept then ROI computation then selection and decision'
                    }, 
                    {
                      label:'Identified Pain', 
                      text:'9 dev spent 15 min per day fixing the prbm !'
                    },
                    {
                      label:'Champion', 
                      text:'CEO right hand man who wantsToBeCEO thanks to our Awesome Project'}                     
                  ],  
                  
                  // sfdcCustomerContacts:[accounts[0]._id],
                  todoLists :[],
                  owner : userDoc._id ,

                },
                {

                  creationDate : new Date("2018-03-02"),
                  modification : [new Date("2018-03-03")],
                  name : 'First Meeting with COO', // make coexist SFDC and own name here
                  currentItemsLabel : ['Metrics', 'Economic Buyer', 'Decision Criteria', 'Decision Process', 'Identified Pain', 'Champion'], // ex: Pain, Buyer, Decision Process,
                  sfdcItemsLabel : ['Pains', 'Metrics', 'EB'],
                  persoItemsLabel : ['Personnal Win', 'Hate Somebody'],
                  textInputs:[{
                    label : 'Metrics', 
                    text:'Daily Dowtime 30 minutes'
                  }, 
                  {
                    label:'Economic Buyer', 
                    text:'The super busy CEO off course !'
                  },
                  {
                    label:'Decision Criteria', 
                    text:"Money, timing, Team's adoption'"},
                    {
                      label : 'Decision Process', 
                      text:'RFP then Proof of Concept then ROI computation then selection and decision'
                    }, 
                    {
                      label:'Identified Pain', 
                      text:'9 dev spent 15 min per day fixing the prbm !'
                    },
                    {
                      label:'Champion', 
                      text:'CEO right hand man who wantsToBeCEO thanks to our Awesome Project'}                     
                  ],  
                  
                  // sfdcCustomerContacts:[accounts[0]._id],
                  todoLists :[],
                  owner : userDoc._id ,

                },
                {

                  creationDate : new Date("2018-03-02"),
                  modification : [new Date("2018-03-03")],
                  name : 'First Meeting with CTO', // make coexist SFDC and own name here
                  currentItemsLabel : ['Metrics', 'Economic Buyer', 'Decision Criteria', 'Decision Process', 'Identified Pain', 'Champion'], // ex: Pain, Buyer, Decision Process,
                  sfdcItemsLabel : ['Pains', 'Metrics', 'EB'],
                  persoItemsLabel : ['Personnal Win', 'Hate Somebody'],
                  textInputs:[{
                    label : 'Metrics', 
                    text:'Daily Dowtime 30 minutes'
                  }, 
                  {
                    label:'Economic Buyer', 
                    text:'The super busy CEO off course !'
                  },
                  {
                    label:'Decision Criteria', 
                    text:"Money, timing, Team's adoption'"},
                    {
                      label : 'Decision Process', 
                      text:'RFP then Proof of Concept then ROI computation then selection and decision'
                    }, 
                    {
                      label:'Identified Pain', 
                      text:'9 dev spent 15 min per day fixing the prbm !'
                    },
                    {
                      label:'Champion', 
                      text:'CEO right hand man who wantsToBeCEO thanks to our Awesome Project'}                     
                  ],  
                  
                  // sfdcCustomerContacts:[accounts[0]._id],
                  todoLists :[],
                  owner : userDoc._id ,

                },
                {

                  creationDate : new Date("2018-03-02"),
                  modification : [new Date("2018-03-03")],
                  name : 'Meeting with Project Team', // make coexist SFDC and own name here
                  currentItemsLabel : ['Metrics', 'Economic Buyer', 'Decision Criteria', 'Decision Process', 'Identified Pain', 'Champion'], // ex: Pain, Buyer, Decision Process,
                  sfdcItemsLabel : ['Pains', 'Metrics', 'EB'],
                  persoItemsLabel : ['Personnal Win', 'Hate Somebody'],
                  textInputs:[{
                    label : 'Metrics', 
                    text:'Customers complains have doubled in a month'
                  }, 
                  {
                    label:'Economic Buyer', 
                    text:"Don't want to reveal who"
                  },
                  {
                    label:'Decision Criteria', 
                    text:"Cheapest !"},
                    {
                      label : 'Decision Process', 
                      text:'RFP then Proof of Concept then ROI computation then selection and decision'
                    }, 
                    {
                      label:'Identified Pain', 
                      text:'9 dev spent 15 min per day fixing the prbm !'
                    },
                    {
                      label:'Champion', 
                      text:'CEO right hand man who wantsToBeCEO thanks to our Awesome Project'}                     
                  ],  
                  
                  // sfdcCustomerContacts:[accounts[0]._id],
                  todoLists :[],
                  owner : userDoc._id ,

                },
                {

                  creationDate : new Date("2018-03-02"),
                  modification : [new Date("2018-03-03")],
                  name : 'Phone call with @Jim', // make coexist SFDC and own name here
                  currentItemsLabel : ['Metrics', 'Economic Buyer', 'Decision Criteria', 'Decision Process', 'Identified Pain', 'Champion'], // ex: Pain, Buyer, Decision Process,
                  sfdcItemsLabel : ['Pains', 'Metrics', 'EB'],
                  persoItemsLabel : ['Personnal Win', 'Hate Somebody'],
                  textInputs:[{
                    label : 'Metrics', 
                    text:'Group strategy is to provide single source of truth'
                  }, 
                  {
                    label:'Economic Buyer', 
                    text:'Board Members'
                  },
                  {
                    label:'Decision Criteria', 
                    text:"Money "},
                    {
                      label : 'Decision Process', 
                      text:'RFP then Proof of Concept then ROI computation then selection and decision'
                    }, 
                    {
                      label:'Identified Pain', 
                      text:'9 dev spent 15 min per day fixing the prbm !'
                    },
                    {
                      label:'Champion', 
                      text:'CEO right hand man who wantsToBeCEO thanks to our Awesome Project'}                     
                  ],  
                  
                  // sfdcCustomerContacts:[accounts[0]._id],
                  todoLists :[],
                  owner : userDoc._id ,

                },
                {

                  creationDate : new Date("2018-03-02"),
                  modification : [new Date("2018-03-03")],
                  name : 'Meeting @PascalB, @FredericR', // make coexist SFDC and own name here
                  currentItemsLabel : ['Metrics', 'Economic Buyer', 'Decision Criteria', 'Decision Process', 'Identified Pain', 'Champion'], // ex: Pain, Buyer, Decision Process,
                  sfdcItemsLabel : ['Pains', 'Metrics', 'EB'],
                  persoItemsLabel : ['Personnal Win', 'Hate Somebody'],
                  textInputs:[{
                    label : 'Metrics', 
                    text:'20% of turnover every Quarter'
                  }, 
                  {
                    label:'Economic Buyer', 
                    text:'Frederic has the budget and has CEO s approval until 200K€ !'
                  },
                  {
                    label:'Decision Criteria', 
                    text:"Money, timing, Team's adoption'"},
                    {
                      label : 'Decision Process', 
                      text:'RFP then Proof of Concept then ROI computation then selection and decision'
                    }, 
                    {
                      label:'Identified Pain', 
                      text:'9 dev spent 15 min per day fixing the prbm !'
                    },
                    {
                      label:'Champion', 
                      text:'CEO right hand man who wantsToBeCEO thanks to our Awesome Project'}                     
                  ],  
                  
                  // sfdcCustomerContacts:[accounts[0]._id],
                  todoLists :[],
                  owner : userDoc._id ,

                }
              ]

                Note.create(notes, (err,notes) => {
                  console.log(" Error notes",err, notes)
                  User.update({_id: userDoc._id},
                    {$push: {
                      myAccountsList: [accounts[0]._id, accounts[1]._id,accounts[2]._id]
                      // opportunities: [opps[0]._id,opps[1]._id,opps[2]._id]
                    }
                  })
                  .then( (err, usr) => {
                    console.log('usr', err,  opps[0], notes[0])
                    return Opp.update({_id: opps[0]._id}, 
                      {$push: {
                        notes: [notes[0]._id]
                      }
                    })
                  })
                  .then( (err, usr) => {
                    // console.log('usr', err,  opps[0], notes[0])
                    return Opp.update({_id: opps[1]._id}, 
                      {$push: {
                        notes: [notes[1]._id]
                      }
                    })
                  })
                  .then( (err, usr) => {
                    // console.log('usr', err,  opps[0], notes[0])
                    return Opp.update({_id: opps[2]._id}, 
                      {$push: {
                        notes: [notes[2]._id]
                      }
                    })
                  })
                  .then( (err, usr) => {
                    // console.log('usr', err,  opps[0], notes[0])
                    return Opp.update({_id: opps[3]._id}, 
                      {$push: {
                        notes: [notes[3]._id]
                      }
                    })
                  })
                  .then( (err, usr) => {
                    // console.log('usr', err,  opps[0], notes[0])
                    return Opp.update({_id: opps[4]._id}, 
                      {$push: {
                        notes: [notes[4]._id]
                      }
                    })
                  })
                  .then( (err, usr) => {
                    // console.log('usr', err,  opps[0], notes[0])
                    return Opp.update({_id: opps[5]._id}, 
                      {$push: {
                        notes: [notes[5]._id]
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

  
  
  
  
  
  
  
  
  