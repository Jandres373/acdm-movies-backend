const request = require('supertest');
const app = require('../app.js');
require('../models/index.js')

describe('Movie Endpoints', () => {
  let movieId;

  test('GET /movies returns a 200 status and an array of movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach(movie => {
      expectMovieStructure(movie);
    });
  });

  test('POST /movies creates a new movie and returns the created movie', async () => {
    const newMovie = {
      name: 'Inception',
      image: 'inception.jpg',
      synopsis: 'A mind-bending thriller.',
      releaseYear: '2010',
    };

    const res = await request(app)
      .post('/movies')
      .send(newMovie);

    expect(res.status).toBe(201);
    expectMovieStructure(res.body);

    movieId = res.body.id;

    const createdMovie = await request(app).get(`/movies/${movieId}`);
    expect(createdMovie.status).toBe(200);
    expect(createdMovie.body).toEqual(res.body);
  });

  test('GET /movies/:id returns a movie by ID with correct structure', async () => {
    const res = await request(app).get(`/movies/${movieId}`);
    expect(res.status).toBe(200);
    expectMovieStructure(res.body);
    expect(res.body.id).toBe(movieId);
  });

  test('PUT /movies/:id updates a movie by ID', async () => {
    const updatedMovie = {
      name: 'UpdatedInception',
      image: 'updated_inception.jpg',
      synopsis: 'An updated mind-bending thriller.',
      releaseYear: '2010',
    };

    const res = await request(app)
      .put(`/movies/${movieId}`)
      .send(updatedMovie);

    expect(res.status).toBe(200);
    expectMovieStructure(res.body);
    expect(res.body.id).toBe(movieId);

    const getUpdatedMovie = await request(app).get(`/movies/${movieId}`);
    expect(getUpdatedMovie.status).toBe(200);
    expect(getUpdatedMovie.body).toEqual(res.body);
  });

  test('DELETE /movies/:id removes a movie by ID', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);

    const getMovie = await request(app).get(`/movies/${movieId}`);
    expect(getMovie.status).toBe(404);
    expect(getMovie.body).toEqual({});
  });
});

function expectMovieStructure(movie) {
  expect(movie).toHaveProperty('id');
  expect(typeof movie.id).toBe('number');

  expect(movie).toHaveProperty('name');
  expect(typeof movie.name).toBe('string');

  expect(movie).toHaveProperty('image');
  expect(typeof movie.image).toBe('string');

  expect(movie).toHaveProperty('synopsis');
  expect(typeof movie.synopsis).toBe('string');

  expect(movie).toHaveProperty('releaseYear');
  expect(typeof movie.releaseYear).toBe('string');
}
