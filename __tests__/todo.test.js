const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('react-native-todo-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should create a todo for a user using the POST method', async () => {
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
});
