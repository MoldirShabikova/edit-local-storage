import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = {
      text: inputVal,
      id: nanoid(),
      completed: false
    };

    setTodos([...todos].concat(newObj));
    setInputVal("");
  };
  const handleDelete = (id) => {
    const filtered = [...todos].filter((el) => el.id !== id);
    setTodos(filtered);
  };
  const toggleComplete = (id) => {
    const toggleCheckbox = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(toggleCheckbox);
  };

  const editTodoBtn = (id) => {
    const updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editText;
      }
      return todo;
    });
    setTodos(updatedTodo);
    setEdit(null);
    setEditText("");
  };
  console.log(todos);
  return (
    <div>
      ToDo App
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
          type="text"
          placeholder="add new todo"
        />
        <button type="submit">Add</button>
      </form>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {edit === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
              />
            ) : (
              <div>{todo.text}</div>
            )}

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <button onClick={() => setEdit(todo.id)}>Edit</button>
            {edit === todo.id ? (
              <button onClick={() => editTodoBtn(todo.id)}>Save</button>
            ) : (
              <button onClick={() => handleDelete(todo.id)}>x</button>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default App;
