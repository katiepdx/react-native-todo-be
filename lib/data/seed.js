const Todo = require('../models/todo');
const chance = require('chance').Chance();

module.exports = async ({ todosCount = 10 } = {}) => {
  const todosToSeed = [...Array(todosCount)]
    .map((_, index) => ({
      todoId: index,
      userEmail: chance.email(),
      todo: `todo: ${chance.sentence()}`,
      notes: 'notes notes notes',
      completed: chance.bool(),
      tags: ['todos', 'sql', 'post'],
      dateAdded: new Date(Date.now()),
      dateCompleted: new Date(Date.now())
    }));

  await Promise.all(todosToSeed.map(todo => (Todo.insert(todo))));
};
