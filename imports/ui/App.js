import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { useTracker } from 'meteor/react-meteor-data';
import Task from './Task';
import { TasksCollection } from '../api/TasksCollection';
import TaskForm from './TaskForm';

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  });
};

const deleteTodo = ({ _id }) => {
  TasksCollection.remove(_id);
};

export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  return (
    <div className="container">
      <h1>Welcome to Meteor!</h1>
      <TaskForm />
      <ul>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onCheckboxClick={toggleChecked}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};
