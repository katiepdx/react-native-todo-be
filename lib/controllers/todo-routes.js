const Todo = require('../models/todo');
const { Router } = require('express');

module.exports = Router()
  .post('/todos', (req, res, next) => {
    Todo
      .insert(req.body)
      .then(todo => res.send(todo))
      .catch(next);
  })
  .get('/todos', (req, res, next) => {
    Todo
      .getAll(req.body)
      .then(allTodos => res.send(allTodos))
      .catch(next);
  })
  .get('/todos/:id', (req, res, next) => {
    Todo
      .getById(req.params.id)
      .then(todo => res.send(todo))
      .catch(next);
  })
  .put('/todos/:id', (req, res, next) => {
    Todo
      .updateById(req.body, req.params.id)
      .then(todo => res.send(todo))
      .catch(next);
  })
  .delete('/todos/:id', (req, res, next) => {
    Todo
      .deleteById(req.params.id)
      .then(todo => res.send(todo))
      .catch(next);
  });
