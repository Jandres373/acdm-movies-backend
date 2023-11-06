const express = require('express');
const router = express.Router();
const actorRouter = require('./actor.routes');
const movieRouter = require('./movie.routes');
const genreRouter = require('./genre.routes');
const directorRouter = require('./director.routes');

// colocar las rutas aquí

router.use('/actors', actorRouter);
router.use('/movies', movieRouter);
router.use('/genres', genreRouter);
router.use('/directors', directorRouter);

module.exports = router;