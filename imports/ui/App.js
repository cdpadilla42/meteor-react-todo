import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Task from './Task';
import { TasksCollection } from '../db/TasksCollection';
import TaskForm from './TaskForm';
import LoginForm from './LoginForm';

const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call('tasks.setIsChecked', _id, !isChecked);
};

const deleteTodo = ({ _id }) => {
  Meteor.call('tasks.remove', _id);
};

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };

    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const pendingTasksCount = TasksCollection.find(hideCompletedFilter).count();

    return { tasks, pendingTasksCount };
  });

  function logout() {
    Meteor.logout();
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      {user ? (
        <>
          <div className="user" onClick={logout}>
            {user.username} 🚪
          </div>
          <h1>
            Welcome to Meteor!{' '}
            {pendingTasksCount ? `(${pendingTasksCount})` : ''}
          </h1>
          <TaskForm />
          <div className="filter">
            <button onClick={() => setHideCompleted(!hideCompleted)}>
              {hideCompleted ? 'Show All' : 'Hide Completed'}
            </button>
          </div>
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
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
