import { expect } from 'chai';
import Firebase from 'firebase';
import { Task } from './task';


describe('Task', () => {
  let task;

  beforeEach(() => {
    task = new Task('title');
  });

  it('should set #completed to `false`', () => {
    expect(task.completed).to.equal(false);
  });

  it('should set #createdAt with Firebase timestamp constant', () => {
    expect(task.createdAt).to.eql(Firebase.ServerValue.TIMESTAMP);
  });

  it('should set #title with provided title', () => {
    expect(task.title).to.equal('title');
  });
});
