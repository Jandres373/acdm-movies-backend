const catchError = require("../utils/catchError");
const Genre = require("../models/genre.model");
const Movie = require("../models/movie.model");

const getAll = catchError(async (_, res) => {
  const results = await Genre.findAll({ include: [Movie] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Genre.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Genre.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Genre.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Genre.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setGenreMovies = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Genre.findByPk(id);
  if (!result) return res.sendStatus(404);
  await result.setMovies(req.body);
  const response = await result.getMovies();
  return res.sendStatus(204).json(response);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setGenreMovies,
};
