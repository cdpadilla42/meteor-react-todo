import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const TaskForm = () => {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text);

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
