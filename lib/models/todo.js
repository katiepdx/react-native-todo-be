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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM user_todos WHERE todo_id=$1', [id]);

    return new Todo(rows[0]);
  }

  static async updateById(updatedTodo, id) {
    const { rows } = await pool.query(`
    UPDATE user_todos
    SET user_email=$1, todo=$2, notes=$3, completed=$4, tags=$5, date_added=$6, date_completed=$7
    WHERE todo_id=$8
    RETURNING *
    `, [updatedTodo.userEmail, updatedTodo.todo, updatedTodo.notes, updatedTodo.completed, updatedTodo.tags, updatedTodo.dateAdded, updatedTodo.dateCompleted, id]);

    return new Todo(rows[0]);
  }
};
