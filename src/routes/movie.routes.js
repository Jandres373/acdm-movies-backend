const { getAll, create, getOne, remove, update, setMovieGenres, setMovieDirectors, setMovieActors } = require('../controllers/movie.controller');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

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