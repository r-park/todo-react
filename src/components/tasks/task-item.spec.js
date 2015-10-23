/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { Simulate } from 'react-addons-test-utils';
import { createTestComponent } from 'utils/test';
import { TaskItem } from './task-item';


describe('TaskItem', () => {
  let task;
  let taskItem;


  beforeEach(() => {
    task = {completed: true, title: 'test'};

    taskItem = createTestComponent(TaskItem, {
      task,
      deleteTask: sinon.spy(),
      updateTask: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should initialize #state.editing to be false', () => {
      expect(taskItem.state.editing).to.equal(false);
    });

    it('should initialize #props.task with a task object', () => {
      expect(taskItem.props.task).to.be.a('object');
    });
  });


  describe('Component methods:', () => {
    describe('#delete', () => {
      it('should call #taskActions.deleteTask', () => {
        taskItem.delete();
        expect(taskItem.props.deleteTask.callCount).to.equal(1);
        expect(taskItem.props.deleteTask.calledWith(taskItem.props.task)).to.equal(true);
      });
    });

    describe('#editTitle', () => {
      it('should set #state.editing to `true`', () => {
        taskItem.editTitle();
        expect(taskItem.state.editing).to.equal(true);
      });
    });

    describe('#stopEditing', () => {
      it('should set #state.editing to `false`', () => {
        taskItem.state.editing = true;
        taskItem.stopEditing();
        expect(taskItem.state.editing).to.equal(false);
      });
    });

    describe('#saveTitle', () => {
      it('should do nothing if not editing', () => {
        taskItem.stopEditing = sinon.spy();
        taskItem.state.editing = false;
        taskItem.saveTitle();
        expect(taskItem.stopEditing.callCount).to.equal(0);
      });

      it('should set #state.editing to `false`', () => {
        taskItem.state.editing = true;
        taskItem.saveTitle({
          target: {value: ''}
        });
        expect(taskItem.state.editing).to.equal(false);
      });

      it('should call #taskActions.updateTask', () => {
        taskItem.state.editing = true;
        taskItem.saveTitle({
          target: {value: 'foo'}
        });
        expect(taskItem.props.updateTask.callCount).to.equal(1);
        expect(taskItem.props.updateTask.args[0][0]).to.equal(task);
        expect(taskItem.props.updateTask.args[0][1].title).to.equal('foo');
      });
    });

    describe('#toggleStatus', () => {
      it('should call #taskActions.updateTask', () => {
        taskItem.toggleStatus({
          target: {checked: true}
        });

        expect(taskItem.props.updateTask.callCount).to.equal(1);
      });

      it('should toggle task.complete', () => {
        taskItem.toggleStatus();
        expect(taskItem.props.updateTask.args[0][1].completed).to.equal(!task.completed);
      });
    });

    describe('#onKeyUp', () => {
      describe('with enter key', () => {
        it('should call #saveTitle with event object', () => {
          taskItem.saveTitle = sinon.spy();
          taskItem.onKeyUp({keyCode: 13});
          expect(taskItem.saveTitle.callCount).to.equal(1);
        });
      });

      describe('with escape key', () => {
        it('should set #state.editing to `false`', () => {
          taskItem.state.editing = true;
          taskItem.onKeyUp({keyCode: 27});
          expect(taskItem.state.editing).to.equal(false);
        });
      });
    });
  });


  describe('DOM', () => {
    describe('`click` event triggered on toggle-status button', () => {
      it('should call #toggleStatus()', () => {
        taskItem.toggleStatus = sinon.spy();
        taskItem.setState({editing: true});
        Simulate.click(taskItem.refs.toggleStatusButton);
        expect(taskItem.toggleStatus.callCount).to.equal(1);
      });
    });


    describe('title', () => {
      it('should be rendered as a text input field when editing', () => {
        taskItem.setState({editing: true});
        let element = taskItem.refs.titleInput;
        expect(element.tagName).to.equal('INPUT');
      });

      it('should be rendered as text when not editing', () => {
        taskItem.setState({editing: false});
        let element = taskItem.refs.titleText;
        expect(element.innerText).to.equal(task.title);
      });
    });


    describe('`blur` event triggered on text field', () => {
      it('should call #saveTitle()', () => {
        taskItem.saveTitle = sinon.spy();
        taskItem.setState({editing: true});
        Simulate.blur(taskItem.refs.titleInput);
        expect(taskItem.saveTitle.callCount).to.equal(1);
      });

      it('should toggle visibility of text field and task title', () => {
        taskItem.setState({editing: true});
        Simulate.blur(taskItem.refs.titleInput);
        expect(taskItem.refs.titleInput).not.to.exist;
        expect(taskItem.refs.titleText).to.exist;
      });
    });


    describe('`keyup` event triggered with enter key on text field', () => {
      it('should call #saveTitle()', () => {
        taskItem.saveTitle = sinon.spy();
        taskItem.setState({editing: true});
        Simulate.keyUp(taskItem.refs.titleInput, {keyCode: 13});
        expect(taskItem.saveTitle.callCount).to.equal(1);
      });

      it('should toggle visibility of text field and task title', () => {
        taskItem.setState({editing: true});
        Simulate.keyUp(taskItem.refs.titleInput, {keyCode: 13});
        expect(taskItem.refs.titleInput).not.to.exist;
        expect(taskItem.refs.titleText).to.exist;
      });
    });


    describe('`keyup` event triggered with escape key on text field', () => {
      it('should call #stopEditing()', () => {
        taskItem.stopEditing = sinon.spy();
        taskItem.setState({editing: true});
        Simulate.keyUp(taskItem.refs.titleInput, {keyCode: 27});
        expect(taskItem.stopEditing.callCount).to.equal(1);
      });

      it('should toggle visibility of text field and task title', () => {
        taskItem.setState({editing: true});
        Simulate.keyUp(taskItem.refs.titleInput, {keyCode: 27});
        expect(taskItem.refs.titleInput).not.to.exist;
        expect(taskItem.refs.titleText).to.exist;
      });
    });


    describe('`click` event triggered on edit button', () => {
      it('should display text field', () => {
        Simulate.click(taskItem.refs.editButton);
        expect(taskItem.refs.titleInput).to.exist;
      });

      it('should hide task title', () => {
        Simulate.click(taskItem.refs.editButton);
        expect(taskItem.refs.titleText).not.to.exist;
      });
    });


    describe('`click` event triggered on delete button', () => {
      it('should call #delete()', () => {
        taskItem.delete = sinon.spy();
        taskItem.setState({editing: true});
        Simulate.click(taskItem.refs.deleteButton);
        expect(taskItem.delete.callCount).to.equal(1);
      });
    });
  });
});
