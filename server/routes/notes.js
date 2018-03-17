const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Opps = require('../models/opportunity');
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

//Seed user ID de Jordan : 5aad205962445a3e5c7c5ac4 
router.get('/:id/user', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  Notes.find({owner:req.params.id})  
  .then(notes => {
    res.json(notes)
  })
});

router.get('/', (req, res, next) => {
  Notes.find({})  
  .then(notes => {
    res.json(notes)
  })
});

router.post('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  const newNote = new Notes(req.body)
  console.log(req.body)
  newNote.save( (err, doc) => { 
    console.log('erreur', err);
    console.log('note',doc)
    if (err) 
      return res.status(500).send(err);
    console.log(err);
    res.json({_id: doc._id})
  });

  router.put('/:id', (req, res, next) => {
    console.log(req.body);
    
    
    
    // const newNote = new Notes()
    // // console.log(req.body.name)
    // newNote.save( err => { 
    //   if (err) 
    //     return res.status(500).send(err);
    //   console.log(err);
    //   res.json({_id: newNote._id})
    })

  // .then(newNote => {
  //   res.send('note crée')
  // })
  // .then(
  //   res.redirect("/")
  // )
});


module.exports = router;