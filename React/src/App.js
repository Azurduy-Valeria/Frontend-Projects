import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [input, setInput] = useState("");
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  const handleAddTodo = () => {
    if (input) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const handleSelectTask = (index) => {
    const newSelectedTasks = new Set(selectedTasks);
    if (selectedTasks.has(index)) {
      newSelectedTasks.delete(index);
    } else {
      newSelectedTasks.add(index);
    }
    setSelectedTasks(newSelectedTasks);
  };

  const handleRemoveTodos = () => {
    const newTodos = todos.filter((_, index) => !selectedTasks.has(index));
    setTodos(newTodos);
    setSelectedTasks(new Set());
  };

  const handleDoneTodos = () => {
    const doneTasks = todos.filter((_, index) => selectedTasks.has(index));
    const remainingTasks = todos.filter((_, index) => !selectedTasks.has(index));
    setDoneTodos([...doneTodos, ...doneTasks]);
    setTodos(remainingTasks);
    setSelectedTasks(new Set());
  };

  const trashButtonStyle = {
    fontSize: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  };

  const tasksContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  };

  const headerStyle = {
    textAlign: 'center'
  };

  const inputContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px'
  };

  return (
    <div>
      <h1 style={headerStyle}>My To-Do List</h1>
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={handleAddTodo}>Add Task</button>
        <button onClick={handleDoneTodos}>Done</button>
        <button style={trashButtonStyle} onClick={handleRemoveTodos}>🗑️</button>
      </div>
      <div style={tasksContainerStyle}>
        <div>
          <h2>Tasks</h2>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={selectedTasks.has(index)}
                  onChange={() => handleSelectTask(index)}
                />
                {todo}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Done</h2>
          <ul>
            {doneTodos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
