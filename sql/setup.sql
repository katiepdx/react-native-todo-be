DROP TABLE IF EXISTS user_todos;

CREATE TABLE user_todos (
  todo_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_email TEXT NOT NULL,
  todo TEXT NOT NULL,
  notes TEXT,
  completed BOOLEAN NOT NULL,
  tags TEXT[],
  date_added DATE,
  date_completed DATE
)
