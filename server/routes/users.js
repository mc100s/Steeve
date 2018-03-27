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

// router.get('/:id', (req, res, next) => {
//   User.find({_id: req.params.id}).populate('opportunities').populate('notes')    
//     .then(users => {
//       res.json(users)
//     })
// });

router.get('/opportunities', (req, res, next) => {
  Opps.find({}).populate('owner').populate('notes')    
    .then(opps => {
      // console.log(opps)
      res.json(opps)
    })
});

router.get('/:id/accounts', (req, res, next) => {
  User.findById(req.params.id).populate('myAccountsList')   
    .then(user => {
      console.log('ok!',user.myAccountsList)
      res.json(user.myAccountsList)
    })
});


// Route to get all users
// router.get('/', (req, res, next) => {
//   User.find()
//     .then(users => {
//       res.json(users)
//     })
// });

// Route to add a picture on one user
// To perform the request throw Postman, you need
// - Endpoint: POST http://localhost:3030/api/users/picture
// - Select: Body > form-data
// - Put as key: picture (and select "File")
// - Upload your file
// To perform the request in HTML:
//   <form method="post" enctype="multipart/form-data" action="http://localhost:3030/api/users/picture">
//     <input type="file" name="picture" />
//     <input type="submit" value="Upload" />
//   </form>

// router.post('/picture-one-user', parser.single('picture'), (req, res, next) => {
//   User.findOneAndUpdate({}, {pictureUrl: req.file.url })
//     .then(() => {
//       res.json({
//         success: true,
//         pictureUrl: req.file.url
//       })
//     })
// });

module.exports = router;