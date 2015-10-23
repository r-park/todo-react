import { expect } from 'chai';
import { List } from 'immutable';
import { scryRenderedComponentsWithType }  from 'react-addons-test-utils';
import { createTestComponent } from 'test/utils';
import { TaskList } from './task-list';
import { TaskItem } from './task-item';


describe('TaskList', () => {
  let tasks;
  let taskList;


  beforeEach(() => {
    tasks = new List([
      {completed: false, title: 'active task'},
      {completed: true, title: 'completed task'}
    ]);

    taskList = createTestComponent(TaskList, {tasks});
  });


  describe('Instantiation:', () => {
    it('should set #props.tasks with an immutable List', () => {
      expect(taskList.props.tasks instanceof List).to.equal(true);
    });
  });


  describe('DOM:', () => {
    it('should render all tasks', () => {
      let taskItems = scryRenderedComponentsWithType(taskList, TaskItem);
      expect(taskItems.length).to.equal(2);
    });

    it('should render active tasks', () => {
      taskList = createTestComponent(TaskList, {filter: 'active', tasks});
      let taskItems = scryRenderedComponentsWithType(taskList, TaskItem);

      expect(taskItems.length).to.equal(1);
      expect(taskItems[0].props.task.completed).to.equal(false);
    });

    it('should render completed tasks', () => {
      taskList = createTestComponent(TaskList, {filter: 'completed', tasks});
      let taskItems = scryRenderedComponentsWithType(taskList, TaskItem);

      expect(taskItems.length).to.equal(1);
      expect(taskItems[0].props.task.completed).to.equal(true);
    });
  });
});
