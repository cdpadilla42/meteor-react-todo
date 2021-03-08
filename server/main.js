import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';

function insertTaskText(tasksText) {
  TasksCollection.insert({ text: tasksText });
}

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  // If no user, add one
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  // If the Tasks collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    ['Letsgo', 'tasktime', 'vroom'].forEach(insertTaskText);
  }
});
