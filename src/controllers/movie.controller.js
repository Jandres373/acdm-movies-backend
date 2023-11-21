const catchError = require("../utils/catchError");
const Movie = require("../models/movie.model");
const Genre = require("../models/genre.model");
const Actor = require("../models/actor.model");
const Director = require("../models/director.model");
const { uploadToCloudinary } = require("../utils/cloudinary");

const getAll = catchError(async (_, res) => {
  const results = await Movie.findAll({ include: [Genre, Actor, Director] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Movie.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Movie.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setMovieGenres = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id);
  if (!result) return res.sendStatus(404);
  await result.setGenres(req.body);
  const response = await result.getGenres();
  console.log(req.body);
  return res.json(response);
});

const setMovieDirectors = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id);
  if (!result) return res.sendStatus(404);
  await result.setDirectors(req.body);
  const response = await result.getDirectors();
  console.log(req.body);
  return res.json(response);
});

const setMovieActors = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id);
  if (!result) return res.sendStatus(404);
  await result.setActors(req.body);
  const response = await result.getActors();
  console.log(req.body);
  return res.json(response);
});

const updateImage = catchError(async (req,res)=>{
  const {path,filename} = req.file;
  if (!req.file) return res.status(400).json({message: "no image provided"})
  const {url} =await uploadToCloudinary(path, filename)
  res.status(201).json({url})
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieGenres,
  setMovieDirectors,
  setMovieActors,
  updateImage,
};
