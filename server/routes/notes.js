const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Opportunity = require('../models/opportunity');
const Notes = require('../models/note');
const passport = require('passport');
const config = require('../config');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });

// //Seed user ID de Jordan : 5aad205962445a3e5c7c5ac4 
// router.get('/:id/user', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
//   Notes.find({owner:req.params.id})  
//   .then(notes => {
//     res.json(notes)
//   })
// });


// Get opps from a user
//Seed user ID de Jordan : 5aad205962445a3e5c7c5ac4 
router.get('/:id/user', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  Opportunity.find({owner:req.params.id}).populate('notes')  
  .then(opps => {
    res.json(opps)
  })
});

//  Opps.find({}).populate('owner').populate('notes')  

//-----GET ALL NOTES----
router.get('/', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  Notes.find({})  
  .then(notes => {
    res.json(notes)
  })
});

//----CREATE A NEW NOTE----
router.post('/:id/addNote', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  console.log(req.params)
  Opportunity.findById(req.params.id)
  .then((resp) => {  
    console.log(resp);
    const newNote = new Notes(req.body);
    newNote.owner = resp.owner;
    newNote.save((err,doc) => {
      if(err) 
      return res.status(500).send(err);
      resp.notes.push(doc._id);
      resp.save()
      res.json({_id: doc._id})
    })
  })
}) 


router.put('/:id', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  console.log(req.body)
  Notes.update({_id:req.params.id}, {$set : {...req.body}}, function callback (err, numAffected) {
  if(err) return res.status(500).send(err)
  res.json({Notes})
  })

})


module.exports = router;