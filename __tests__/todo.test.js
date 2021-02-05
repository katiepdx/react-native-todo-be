const request = require('supertest');
const app = require('../lib/app');
require('../lib/data/data-helpers');

describe('react-native-todo-be routes', () => {
  it('should create a todo for a user using POST', async () => {
    return await request(app)
      .post('/api/v1/todos')
      .send({
        userEmail: 'post-test@email.com',
        todo: 'finish post test',
        notes: 'notes notes notes',
        completed: false,
        tags: ['todos', 'sql', 'post'],
        dateAdded: new Date(Date.now()),
        dateCompleted: new Date(Date.now())
      })
      .then(res => {
        expect(res.body).toEqual({
          todoId: expect.any(String),
          userEmail: 'post-test@email.com',
          todo: 'finish post test',
          notes: 'notes notes notes',
          completed: false,
          tags: ['todos', 'sql', 'post'],
          dateAdded: expect.any(String),
          dateCompleted: expect.any(String)
        });
      });
  });

  it('should get all todos in the database GET', async () => {
    await request(app)
      .get('/api/v1/todos')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([{
          todoId: expect.any(String),
          userEmail: expect.any(String),
          todo: expect.any(String),
          notes: expect.any(String),
          completed: expect.any(Boolean),
          tags: expect.any(Array),
          dateAdded: expect.any(String),
          dateCompleted: expect.any(String)
        }]));
      });
  });

  it('should get a todo by id from the database using GET', async () => {
    await request(app)
      .get('/api/v1/todos/1')
      .then(res => {
        expect(res.body).toEqual({
          todoId: '1',
          userEmail: expect.any(String),
          todo: expect.any(String),
          notes: expect.any(String),
          completed: expect.any(Boolean),
          tags: expect.any(Array),
          dateAdded: expect.any(String),
          dateCompleted: expect.any(String)
        });
      });
  });
});
