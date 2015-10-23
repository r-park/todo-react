import EventSignal from 'event-signal';
import { List } from 'immutable';
import { authStore } from 'core/auth';
import { firebaseRef } from 'core/firebase';


export class TaskStore {
  constructor() {
    this.emitter = new EventSignal();
    this.list = new List();

    const ref = firebaseRef.child(`tasks/${authStore.user.id}`);
    ref.on('child_added', this.created, this);
    ref.on('child_changed', this.updated, this);
    ref.on('child_removed', this.deleted, this);
  }

  get state() {
    return {
      tasks: this.list
    };
  }

  addListener(listener, context) {
    this.emitter.addListener(listener, context);
  }

  removeListener(listener) {
    this.emitter.removeListener(listener);
  }

  emit() {
    this.emitter.emit(this.state);
  }

  created(snapshot) {
    let record = snapshot.val();
    record.key = snapshot.key();
    this.list = this.list.push(record);
    this.emit();
  }

  deleted(snapshot) {
    let index = this.indexOf(snapshot.key());
    if (index > -1) {
      this.list = this.list.delete(index);
      this.emit();
    }
  }

  updated(snapshot) {
    let key = snapshot.key();
    let index = this.indexOf(key);

    if (index > -1) {
      let record = snapshot.val();
      record.key = key;
      this.list = this.list.set(index, record);
    }

    this.emit();
  }

  indexOf(key) {
    return this.list.findIndex(record => {
      return record.key === key;
    });
  }
}
