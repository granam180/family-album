const express = require('express');
const router = express.Router();
const albums = require('../controllers/albums');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateAlbum } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Album = require('../models/album');

router.route('/')
    .get(catchAsync(albums.index))
    .post(isLoggedIn, upload.array('image'), validateAlbum, catchAsync(albums.createAlbum))


router.get('/new', isLoggedIn, albums.renderNewForm)

router.route('/:id')
    .get(catchAsync(albums.showAlbum))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateAlbum, catchAsync(albums.updateAlbum))
    .delete(isLoggedIn, isAuthor, catchAsync(albums.deleteAlbum));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(albums.renderEditForm))



module.exports = router;