import { expect } from 'chai';
import { authStore } from 'core/auth';
import { firebaseRef } from 'core/firebase';
import { taskActions } from 'core/task';


describe('Task Actions', () => {
  let task;

  before(() => {
    authStore.user = {id: 'github:0000000'};
  });

  beforeEach(() => {
    task = {key: '123'};
    sinon.spy(firebaseRef, 'child');
  });

  afterEach(() => {
    firebaseRef.child.restore();
  });


  describe('createTask', () => {
    it('should invoke Firebase#child with correct path', () => {
      taskActions.createTask('test');
      expect(firebaseRef.child.calledWith(`tasks/${authStore.user.id}`)).to.equal(true);
    });
  });


  describe('deleteTask', () => {
    it('should invoke Firebase#child with correct path', () => {
      taskActions.deleteTask(task);
      expect(firebaseRef.child.calledWith(`tasks/${authStore.user.id}/${task.key}`)).to.equal(true);
    });
  });


  describe('updateTask', () => {
    it('should invoke Firebase#child with correct path', () => {
      taskActions.updateTask(task, {});
      expect(firebaseRef.child.calledWith(`tasks/${authStore.user.id}/${task.key}`)).to.equal(true);
    });
  });
});
