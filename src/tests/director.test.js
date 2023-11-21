const request = require('supertest');
const app = require('../app.js');
require('../models/index.js')

let directorId;

describe('Director Endpoints', () => {
  test('GET /directors returns a 200 status and an array of directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2); 

    res.body.forEach(director => {
      expectDirectorStructure(director);
    }); 
  });

  test('POST /directors creates a new director and returns the created director', async () => {
    const newDirector = {
      firstName: "Julian",
      lastName: "Mosquera",
      nationality: "Colombian",
      image: "JM.jpg",
      birthday: "1995-28-05"
    };

    const res = await request(app)
      .post('/directors')
      .send(newDirector);

    expect(res.status).toBe(201);
    expectDirectorStructure(res.body);

    directorId = res.body.id;

    const createdDirector = await request(app).get(`/directors/${directorId}`);
    expect(createdDirector.status).toBe(200);
    expect(createdDirector.body).toEqual(res.body);
  });

  test('GET /directors/:id returns a director by ID with correct structure', async () => {
    const res = await request(app).get(`/directors/${directorId}`);
    expect(res.status).toBe(200);
    expectDirectorStructure(res.body);
    expect(res.body.id).toBe(directorId);
  });

  test('PUT /directors/:id updates a director by ID', async () => {
    const updatedDirector = {
      firstName: "UpdatedName",
      lastName: "UpdatedLastName",
      nationality: "UpdatedNationality",
      image: "updated_image.jpg",
      birthday: "1990-05-15"
    };

    const res = await request(app)
      .put(`/directors/${directorId}`)
      .send(updatedDirector);

    expect(res.status).toBe(200);
    expectDirectorStructure(res.body);
    expect(res.body.id).toBe(directorId);

    const getUpdatedDirector = await request(app).get(`/directors/${directorId}`);
    expect(getUpdatedDirector.status).toBe(200);
    expect(getUpdatedDirector.body).toEqual(res.body);
  });

  test('DELETE /directors/:id removes a director by ID', async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);

    const getDirector = await request(app).get(`/directors/${directorId}`);
    expect(getDirector.status).toBe(404);
    expect(getDirector.body).toEqual({});
  });
});

function expectDirectorStructure(director) {
  expect(director).toHaveProperty('id');
  expect(typeof director.id).toBe('number');

  expect(director).toHaveProperty('firstName');
  expect(typeof director.firstName).toBe('string');

  expect(director).toHaveProperty('lastName');
  expect(typeof director.lastName).toBe('string');

  expect(director).toHaveProperty('nationality');
  expect(typeof director.nationality).toBe('string');

  expect(director).toHaveProperty('image');
  expect(typeof director.image).toBe('string');

  expect(director).toHaveProperty('birthday');
  expect(typeof director.birthday).toBe('string');
}
