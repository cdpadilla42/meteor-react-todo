import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';

function insertTaskText(tasksText, user) {
  TasksCollection.insert({ text: tasksText, userId: user._id });
}

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  TasksCollection.remove({});
  // If no user, add one
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);
  // If the Tasks collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    ['Letsgo', 'tasktime', 'vroom'].forEach((text) =>
      insertTaskText(text, user)
    );
  }
});
