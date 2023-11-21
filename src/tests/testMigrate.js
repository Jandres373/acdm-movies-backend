const sequelize = require("../utils/connection");
const Director = require("../models/director.model");
const Genre = require("../models/genre.model");
const Actor = require("../models/actor.model");
const Movie = require("../models/movie.model");
require('../models/index.js')
const createGenres = async () => {
  const genres = [
    {
      name: "Action",
    },
    {
      name: "Drama",
    },
  ];

  await Genre.bulkCreate(genres);
};

const createActors = async () => {
  const actors = [
    {
      firstName: "Leonardo",
      lastName: "DiCaprio",
      nationality: "American",
      image: "dicaprio.jpg",
      birthday: "1974-11-11",
    },
    {
      firstName: "Scarlett",
      lastName: "Johansson",
      nationality: "American",
      image: "johansson.jpg",
      birthday: "1984-11-22",
    },
  ];

  await Actor.bulkCreate(actors);
};

const createDirectors = async () => {
  const directors = [
    {
      firstName: "Christopher",
      lastName: "Nolan",
      nationality: "British",
      image: "nolan.jpg",
      birthday: "1970-07-30",
    },
    {
      firstName: "Quentin",
      lastName: "Tarantino",
      nationality: "American",
      image: "tarantino.jpg",
      birthday: "1963-03-27",
    },
  ];

  await Director.bulkCreate(directors);
};

const createMovies = async () => {
  const movies = [
    {
      name: "Inception",
      image: "inception.jpg",
      synopsis: "A mind-bending thriller.",
      releaseYear: "2010",
    },
    {
      name: "The Shawshank Redemption",
      image: "shawshank.jpg",
      synopsis: "A tale of hope and redemption.",
      releaseYear: "1994",
    },
  ];

  await Movie.bulkCreate(movies);

  const moviesArr = await Movie.findAll();
  for (let i = 0; i < moviesArr.length; i++) {
    let movie = moviesArr[i];

    await movie.setActors([i+1]);
    await movie.setDirectors([i+1]);
    await movie.setGenres([i+1]);
  }
};

const main = async () => {
  try {
    await sequelize.sync({force:true});

    await createGenres();
    await createActors();
    await createDirectors();
    await createMovies();

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
