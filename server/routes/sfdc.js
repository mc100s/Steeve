var express = require('express');
const Country = require('../models/dataSfdc')

var router = express.Router();

var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  serverUrl : 'https://eu8.lightning.force.com',
  sessionId : 'Y418sfqB38wyuQnCi9UkP50wO'
});


router.get('/myOpps', function(req, res, next) {
  conn.login('julien@bloch.com', 'd817a40fc2Y418sfqB38wyuQnCi9UkP50wO', function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
  });

  let dataOpps = []
  conn.query("select Amount, Id, Account.ID,Opportunity.name from Opportunity", function(err, result) {
    if (err) { return console.error(err); }
    console.log("result", result);
    // console.log("total : " + result.totalSize);
    // console.log("fetched : " + result.records.length);
    // console.log("done ? : " + result.done);
    for (i=0; i<result.records; i++) {
      console.log(result.recordsrecord)
      dataOpps.push(result.records)
      dataOpps.map (record => record.Name)
    }
    return dataOpps;
    console.log('dataopps', dataOpps)
    if (!result.done) {
      // you can use the locator to fetch next records set.
      // Connection#queryMore()
      console.log("next records URL : " + result.nextRecordsUrl);
    }
  });

  
  
  // res.json(process.env)
})



// router.get('/', function(req, res, next) {
//   Country.find()
//     .then(countries => {
//       res.json(countries);
//     })
//     .catch(err => next(err))
// });

// router.get('/static-sample', function(req, res, next) {
//   res.json([{"capitals":[],"_id":"5a9ab1e751771a42c9af9a20","name":"France","__v":0},{"capitals":[],"_id":"5a9ab1f8a2dc8242cd54a87d","name":"France","__v":0},{"capitals":["[\"Paris\", \"Lyon\"]"],"_id":"5a9ab51fa2dc8242cd54a87e","name":"France","description":"Best country ever","__v":0},{"capitals":["Berlin","Munich"],"_id":"5a9ab5a8a2dc8242cd54a881","name":"Germany","description":"Second best country","__v":0},{"capitals":["Canberra"],"_id":"5a9ab7e6458133204b75d510","name":"Australia","area":7692024}])
// });

// router.post('/', function(req, res, next) {
//   let {name, capitals, area, description} = req.body
//   Country.create({name, capitals, area, description})
//     .then(country => {
//       res.json({
//         success: true,
//         country
//       });
//     })
//     .catch(err => next(err))
// });

module.exports = router;
