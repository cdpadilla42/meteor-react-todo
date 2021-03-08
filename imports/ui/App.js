import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { useTracker } from 'meteor/react-meteor-data';
import Task from './Task';
import { TasksCollection } from '../api/TasksCollection';
import TaskForm from './TaskForm';
import LoginForm from './LoginForm';

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
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  return (
    <div className="container">
      {user ? (
        <>
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
