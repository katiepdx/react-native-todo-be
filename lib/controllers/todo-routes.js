const Todo = require('../models/todo');
const { Router } = require('express');

module.exports = Router()
  .post('/todos', (req, res, next) => {
    Todo
      .insert(req.body)
      .then(todo => res.send(todo))
      .catch(next);
  });
