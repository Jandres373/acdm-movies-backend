const request = require('supertest');
const app = require('../app.js');
require('../models/index.js')

describe('Actor Endpoints', () => {
  let actorId;


  test('GET /actors returns a 200 status and an array of actors with correct structure', async () => {
    
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach(actor => {
      expectActorStructure(actor);
    });
  });

  test('POST /actors creates a new actor and returns the created actor', async () => {
    const newActor = {
      firstName: 'John',
      lastName: 'Doe',
      nationality: 'American',
      image: 'john_doe.jpg',
      birthday: '1990-05-15',
    };

    const res = await request(app)
      .post('/actors')
      .send(newActor);

    expect(res.status).toBe(201);
    expectActorStructure(res.body);

    actorId = res.body.id;

    const createdActor = await request(app).get(`/actors/${actorId}`);
    expect(createdActor.status).toBe(200);
    expect(createdActor.body).toEqual(res.body);
  });

  test('GET /actors/:id returns an actor by ID with correct structure', async () => {
    const res = await request(app).get(`/actors/${actorId}`);
    expect(res.status).toBe(200);
    expectActorStructure(res.body);
    expect(res.body.id).toBe(actorId);
  });

  test('PUT /actors/:id updates an actor by ID', async () => {
    const updatedActor = {
      firstName: 'UpdatedName',
      lastName: 'UpdatedLastName',
      nationality: 'UpdatedNationality',
      image: 'updated_image.jpg',
      birthday: '1990-05-15',
    };

    const res = await request(app)
      .put(`/actors/${actorId}`)
      .send(updatedActor);

    expect(res.status).toBe(200);
    expectActorStructure(res.body);
    expect(res.body.id).toBe(actorId);

    const getUpdatedActor = await request(app).get(`/actors/${actorId}`);
    expect(getUpdatedActor.status).toBe(200);
    expect(getUpdatedActor.body).toEqual(res.body);
  });

  test('DELETE /actors/:id removes an actor by ID', async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);

    const getActor = await request(app).get(`/actors/${actorId}`);
    expect(getActor.status).toBe(404);
    expect(getActor.body).toEqual({});
  });
});

function expectActorStructure(actor) {
  expect(actor).toHaveProperty('id');
  expect(typeof actor.id).toBe('number');

  expect(actor).toHaveProperty('firstName');
  expect(typeof actor.firstName).toBe('string');

  expect(actor).toHaveProperty('lastName');
  expect(typeof actor.lastName).toBe('string');

  expect(actor).toHaveProperty('nationality');
  expect(typeof actor.nationality).toBe('string');

  expect(actor).toHaveProperty('image');
  expect(typeof actor.image).toBe('string');

  expect(actor).toHaveProperty('birthday');
  expect(typeof actor.birthday).toBe('string');
}
