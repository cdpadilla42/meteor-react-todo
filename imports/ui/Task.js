import React from 'react';

const Task = ({ task, onCheckboxClick, deleteTodo }) => {
  return (
    <li>
      <input
        type="checkbox"
        name="complete"
        id="complete"
        readonly
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
      />
      <span>{task.text}</span>
      <button className="delete" onClick={() => deleteTodo(task)}>
        &times;
      </button>
    </li>
  );
};

export default Task;
