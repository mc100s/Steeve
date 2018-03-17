const mongoose = require('mongoose');
// const { Schema } = mongoose;

const DataSfdc = require('../dataSfdc');
require('../../configs/database');

var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  serverUrl : 'https://eu8.lightning.force.com',
  sessionId : 'Y418sfqB38wyuQnCi9UkP50wO'
});



conn.login('julien@bloch.com', 'd817a40fc2Y418sfqB38wyuQnCi9UkP50wO', function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  // console.log(conn.accessToken);
  // console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
});


let dataOpps = new DataSfdc()
let data2 =[];
let temp = [];
conn.query("select Amount, Id, Account.ID,Opportunity.name from Opportunity")
.then((result) => {
  let temp = result.records.map(x => {return {name:x.Name}});
  console.log(temp)
  // for (i=0; i<temp.length; i++) {
  //   data2.push(temp[i])
  // }
  DataSfdc.create(temp)
}) 



// function(err, result) {
//   console.log("CALLBACK result", result)
//   if (err) { return console.error(err); }
  
  
  
  // dataOpps = result.records;
//   // return dataOpps;
//   console.log('dataopps', dataOpps)
//   // console.log("result", result);
//   // console.log("total : " + result.totalSize);
//   // console.log("fetched : " + result.records.length);
//   // console.log("done ? : " + result.done);
//   // console.log('lobjet', result.records[0].Account)
//   if (!result.done) {
//     // you can use the locator to fetch next records set.
//     // Connection#queryMore()
//     console.log("next records URL : " + result.nextRecordsUrl);
//   }
// })  
// .then((result) => {
//   console.log("THEN result", result)
//   dataOpps.save(data2)
//   .then( x => console.log('saved'))
//   .catch(err => console.log(err))
// })



// var records = [];
// conn.query("SELECT Id, Name, BillingCity FROM Account WHERE Name = 'ACME'", function(err, result) {
//   //conn.query("SELECT Id, Name FROM Account", function(err, result) {
//   if (err) { return console.error(err); }
//   console.log("result", result);
//   console.log("total : " + result.totalSize);
//   console.log("fetched : " + result.records.length);
//   console.log("done ? : " + result.done);
//   if (!result.done) {
//     // you can use the locator to fetch next records set.
//     // Connection#queryMore()
//     console.log("next records URL : " + result.nextRecordsUrl);
//   }
// });

//