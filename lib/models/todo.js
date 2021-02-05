const pool = require('../utils/pool');

module.exports = class Todo {
  todoId;
  userEmail;
  todo;
  notes;
  completed;
  tags;
  dateAdded;
  dateCompleted;

  constructor(todo) {
    this.todoId = todo.todo_id;
    this.userEmail = todo.user_email;
    this.todo = todo.todo;
    this.notes = todo.notes;
    this.completed = todo.completed;
    this.tags = todo.tags;
    this.dateAdded = todo.date_added;
    this.dateCompleted = todo.date_completed;
  }

  static async insert(todo) {
    const { rows } = await pool.query(
      `INSERT INTO user_todos 
      (user_email, todo, notes, completed, tags, date_added, date_completed)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [todo.userEmail, todo.todo, todo.notes, todo.completed, todo.tags, todo.dateAdded, todo.dateCompleted]
    );

    return new Todo(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM user_todos');

    return rows.map(todo => new Todo(todo));
  }
};
