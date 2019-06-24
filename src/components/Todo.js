// 24.6.19 - Tutorial with React Hooks
// Follow along here:
// https://www.pusher.com/tutorials/todo-app-react-hooks

// Github source:
// https://github.com/neoighodaro/react-hook-todo-app


import React, { useState, useEffect } from 'react';
import './Todo.css';

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div  
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : ""}}
    >
      {task.title}
      <button style={{ background: "red"}} onClick={() => removeTask(index)}>x</button>
      <button onClick={() => completeTask(index)}>Complete</button>
    </div>
  );
}


function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTask(value)
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={e => setValue(e.target.value)}
        />
    </form>
  )
}


function Todo() {
  // hooks with react
  // useState returns an array with two elements
  // the first item is the current state value for the tasks
  // the second is a function that can update the tasks
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([
    {
      title: "Grab some Pizza",
      completed: true
    },
    {
      title: "Do your workout",
      completed: true
    },
    {
      title: "Hangout with friends",
      completed: false
    }
  ]);

  useEffect(() => {
    setTasksRemaining(tasks.filter(task => !task.completed).length)
  });

  const addTask = title => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  }

  const completeTask = index => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <div className="header">Pending tasks ({tasksRemaining})</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            completeTask={completeTask}
            removeTask={removeTask}
            key={index}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}

export default Todo;