const { getAll, create, getOne, remove, update, setMovieGenres, setMovieDirectors, setMovieActors, updateImage } = require('../controllers/movie.controller');
const express = require('express');
const upload = require('../utils/multer');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);
    
movieRouter.route('/images')
    .post(upload.single('image'),updateImage);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/actors')
    .post(setMovieActors)

movieRouter.route('/:id/genres')
    .post(setMovieGenres)

movieRouter.route('/:id/directors')
    .post(setMovieDirectors)
    
module.exports = movieRouter;