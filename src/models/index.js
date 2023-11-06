const Actor = require('../models/actor.model');
const Movie = require('../models/movie.model');
const Genre = require('../models/genre.model');
const Director = require('../models/director.model');

Actor.belongsToMany(Movie, {through: 'movie_actors'});
Movie.belongsToMany(Actor, {through: 'movie_actors'});

Genre.belongsToMany(Movie, {through: 'movie_genres'});
Movie.belongsToMany(Genre, {through: 'movie_genres'});

Director.belongsToMany(Movie, {through: 'movie_directors'});
Movie.belongsToMany(Director, {through: 'movie_directors'});