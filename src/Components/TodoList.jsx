import { useState, useEffect } from "react";
import React from "react";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      if (isEditing) {
        const updatedTodos = todos.map((todo, index) =>
          index === currentIndex ? { ...todo, text: inputValue } : todo
        );
        setTodos(updatedTodos);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        setTodos([...todos, { text: inputValue, completed: false }]);
      }
      setInputValue("");
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setInputValue(todos[index].text);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleClearAll = () => {
    setTodos([]);
    localStorage.removeItem("todos");
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add new Todo"
          className="todo-input"
        />
        <button type="submit" className="todo-btn">
          {isEditing ? "Update" : "Add"}
        </button>
      </form>

      {todos.length > 0 && (
        <button className="clear-btn" onClick={handleClearAll}>
          Clear All
        </button>
      )}

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span onClick={() => toggleComplete(index)}>{todo.text}</span>
            <div className="actions">
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
