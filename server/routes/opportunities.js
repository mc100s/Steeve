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

router.get('/opportunities/:id/user', (req, res, next) => {
  Opps.find({owner:req.params.id})  
    .then(opps => {
      res.json(opps)
    })
});


module.exports = router;