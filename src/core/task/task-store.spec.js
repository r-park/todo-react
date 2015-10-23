import { expect } from 'chai';
import EventSignal from 'event-signal';
import { List } from 'immutable';
import { authStore } from 'core/auth';
import { TaskStore } from 'core/task';


describe('Task Store', () => {
  let taskStore;

  before(() => {
    authStore.user = {id: 'github:0000000'};
  });

  beforeEach(() => {
    taskStore = new TaskStore();
  });


  describe('Initialization', () => {
    it('should initialize emitter', () => {
      expect(taskStore.emitter instanceof EventSignal).to.equal(true);
    });

    it('should initialize list', () => {
      expect(taskStore.list instanceof List).to.equal(true);
    });
  });


  describe('Emitter', () => {
    it('should emit `state` to subscribed listeners', () => {
      let listener = sinon.spy();
      taskStore.addListener(listener);
      taskStore.emit();
      expect(listener.callCount).to.equal(1);
    });

    it('should emit `state` to subscribed listeners with context', () => {
      let context = {
        called: false,
        listener: function() {
          this.called = true;
        }
      };

      taskStore.addListener(context.listener, context);
      taskStore.emit();
      expect(context.called).to.equal(true);
    });

    it('should stop emitting to unsubscribed listeners', () => {
      let listener = sinon.spy();
      taskStore.addListener(listener);
      taskStore.emit();
      expect(listener.callCount).to.equal(1);

      taskStore.removeListener(listener);
      taskStore.emit();
      expect(listener.callCount).to.equal(1);
    });
  });


  describe('Handling created tasks', () => {
    it('should add task to list', () => {
      let snapshot = {
        val: sinon.stub().returns({title: 'test'}),
        key: sinon.stub().returns('123')
      };

      taskStore.created(snapshot);
      expect(taskStore.list.count()).to.equal(1);
    });
  });


  describe('Handling deleted tasks', () => {
    it('should remove task from list', () => {
      let snapshot = {
        val: sinon.stub().returns({title: 'test'}),
        key: sinon.stub().returns('123')
      };

      taskStore.list = taskStore.list.push({key: '123'});
      expect(taskStore.list.count()).to.equal(1);

      taskStore.deleted(snapshot);
      expect(taskStore.list.count()).to.equal(0);
    });
  });


  describe('Handling updated tasks', () => {
    it('should update task in list', () => {
      let snapshot = {
        val: sinon.stub().returns({title: 'changed'}),
        key: sinon.stub().returns('123')
      };

      taskStore.list = taskStore.list.push({title: 'test', key: '123'});
      expect(taskStore.list.count()).to.equal(1);

      taskStore.updated(snapshot);
      expect(taskStore.list.count()).to.equal(1);
      expect(taskStore.list.first().title).to.equal('changed');
    });
  });
});
