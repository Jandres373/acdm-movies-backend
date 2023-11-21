const request = require('supertest');
const app = require('../app.js');
require('../models/index.js')

describe('Genre Endpoints', () => {
  let genreId;

  test('GET /genres returns a 200 status and an array of genres with correct structure', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach(genre => {
      expectGenreStructure(genre);
    });
  });

  test('POST /genres creates a new genre and returns the created genre', async () => {
    const newGenre = {
      name: 'Action',
    };

    const res = await request(app)
      .post('/genres')
      .send(newGenre);

    expect(res.status).toBe(201);
    expectGenreStructure(res.body);

    genreId = res.body.id;

    const createdGenre = await request(app).get(`/genres/${genreId}`);
    expect(createdGenre.status).toBe(200);
    expect(createdGenre.body).toEqual(res.body);
  });

  test('GET /genres/:id returns a genre by ID with correct structure', async () => {
    const res = await request(app).get(`/genres/${genreId}`);
    expect(res.status).toBe(200);
    expectGenreStructure(res.body);
    expect(res.body.id).toBe(genreId);
  });

  test('PUT /genres/:id updates a genre by ID', async () => {
    const updatedGenre = {
      name: 'UpdatedAction',
    };

    const res = await request(app)
      .put(`/genres/${genreId}`)
      .send(updatedGenre);

    expect(res.status).toBe(200);
    expectGenreStructure(res.body);
    expect(res.body.id).toBe(genreId);

    const getUpdatedGenre = await request(app).get(`/genres/${genreId}`);
    expect(getUpdatedGenre.status).toBe(200);
    expect(getUpdatedGenre.body).toEqual(res.body);
  });

  test('DELETE /genres/:id removes a genre by ID', async () => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);

    const getGenre = await request(app).get(`/genres/${genreId}`);
    expect(getGenre.status).toBe(404);
    expect(getGenre.body).toEqual({});
  });
});

function expectGenreStructure(genre) {
  expect(genre).toHaveProperty('id');
  expect(typeof genre.id).toBe('number');

  expect(genre).toHaveProperty('name');
  expect(typeof genre.name).toBe('string');
}
