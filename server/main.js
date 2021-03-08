import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';

function insertTaskText(tasksText) {
  TasksCollection.insert({ text: tasksText });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    ['Letsgo', 'tasktime', 'vroom'].forEach(insertTaskText);
  }
});
