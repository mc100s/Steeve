const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Opportunity = require('../models/opportunity');
const Note = require('../models/note');
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

// Get opps from a user
router.get('/:id/user', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  Opportunity.find({owner:req.params.id}).populate('notes')  
  .then(opps => {
    // console.log(opps)
    res.json(opps)
  })
});

// Get accounts from a user
router.get('/:id/user/accounts', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  accounts.find({owner:req.params.id}).populate('notes')  
  .then(opps => {
    // console.log(opps)
    res.json(opps)
  })
});



//-----GET ALL NOTES----
router.get('/', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  Note.find({})  
  .then(notes => {
    // console.log(notes)
    res.json(notes)
  })
});

//-----GET One NOTES----
router.get('/:id', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  Note.findById(req.params.id)  
  .then(notes => {
    console.log(notes)
    res.json(notes)
  })
});


//----CREATE A NEW NOTE----
router.post('/:opportunityId/addNote', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  console.log('test',req.params.opportunityId)
  Opportunity.findById(req.params.opportunityId)
  .then((resp) => {  
    // console.log(resp);
    const newNote = new Note(req.body);
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
  console.log("DEBUG req.body", req.body)
  Note.findByIdAndUpdate(req.params.id,req.body, function (err, noteDoc) {
  if(err) return res.status(500).send(err)
  else res.json({success: true, noteDoc})
  })

})


module.exports = router;