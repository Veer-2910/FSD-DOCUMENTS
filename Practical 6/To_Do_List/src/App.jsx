import React, { useState } from "react";
import "./App.css";
import { FaTrash, FaEdit } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, input]);
    }

    setInput("");
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setInput(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>Get Things Done !</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="What is the task today?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <span>{task}</span>
            <div className="icons">
              <FaEdit onClick={() => handleEdit(index)} />
              <FaTrash onClick={() => handleDelete(index)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
