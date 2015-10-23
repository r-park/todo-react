import { authStore } from 'core/auth';
import { firebaseRef } from 'core/firebase';
import { Task } from './task';


export function createTask(title) {
  firebaseRef.child(`tasks/${authStore.user.id}`)
    .push(new Task(title), error => {
      if (error) console.error('ERROR @ createTask :', error); // eslint-disable-line no-console
    });
}

export function deleteTask(task) {
  firebaseRef.child(`tasks/${authStore.user.id}/${task.key}`)
    .remove(error => {
      if (error) console.error('ERROR @ deleteTask :', error); // eslint-disable-line no-console
    });
}

export function updateTask(task, changes) {
  firebaseRef.child(`tasks/${authStore.user.id}/${task.key}`)
    .update(changes, error => {
      if (error) console.error('ERROR @ updateTask :', error); // eslint-disable-line no-console
    });
}
