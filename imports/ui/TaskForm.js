import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';

const TaskForm = ({ user }) => {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
      userId: user._id,
    });

    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        id="text"
        onChange={handleChange}
        value={text}
        placeholder="New Task"
      />
      <button type="submit">+ Add Task</button>
    </form>
  );
};

export default TaskForm;
