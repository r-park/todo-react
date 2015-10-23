import { expect } from 'chai';
import { Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { createTestComponent } from 'test/utils';
import { TaskForm } from './task-form';


describe('TaskForm', () => {
  let taskForm;


  beforeEach(() => {
    taskForm = createTestComponent(TaskForm, {
      createTask: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should set #state.title with an empty string', () => {
      expect(taskForm.state.title).to.equal('');
    });
  });


  describe('Component methods:', () => {
    describe('#clearInput', () => {
      it('should set #state.title with an empty string', () => {
        taskForm.state.title = 'foo';
        expect(taskForm.state.title).to.equal('foo');

        taskForm.clearInput();
        expect(taskForm.state.title).to.equal('');
      });
    });


    describe('#onChange', () => {
      it('should set #state.title with event.target.value', () => {
        const event = {target: {value: 'value'}};
        taskForm.onChange(event);
        expect(taskForm.state.title).to.equal(event.target.value);
      });
    });


    describe('#onKeyUp', () => {
      describe('with escape key', () => {
        it('should set #state.title with an empty string', () => {
          taskForm.state.title = 'foo';
          taskForm.onKeyUp({keyCode: 27});
          expect(taskForm.state.title).to.equal('');
        });
      });
    });


    describe('#onSubmit', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        taskForm.onSubmit(event);
        expect(event.preventDefault.callCount).to.equal(1);
      });

      it('should call taskActions#createTask with #state.title', () => {
        const event = {preventDefault: sinon.spy()};

        taskForm.state.title = 'foo';
        taskForm.onSubmit(event);

        expect(taskForm.props.createTask.callCount).to.equal(1);
        expect(taskForm.props.createTask.calledWith('foo')).to.equal(true);
      });

      it('should set #state.title with an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        taskForm.state.title = 'foo';
        taskForm.onSubmit(event);

        expect(taskForm.state.title).to.equal('');
      });
    });
  });


  describe('DOM:', () => {
    describe('`keyup` event triggered on text field with escape key', () => {
      it('should set #state.title with an empty string', () => {
        taskForm.setState({title: 'foo'});
        Simulate.keyUp(taskForm.refs.titleInput, {keyCode: 27});
        expect(taskForm.state.title).to.equal('');
      });

      it('should set text field value with an empty string', () => {
        taskForm.setState({title: 'foo'});
        Simulate.keyUp(taskForm.refs.titleInput, {keyCode: 27});
        expect(taskForm.refs.titleInput.value).to.equal('');
      });
    });


    describe('`change` event triggered on text field', () => {
      it('should set #state.title with the value from the text field', () => {
        taskForm.refs.titleInput.value = 'foo';
        expect(taskForm.state.title).to.equal('');
        Simulate.change(taskForm.refs.titleInput);
        expect(taskForm.state.title).to.equal('foo');
      });
    });


    describe('`submit` event triggered on form', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        Simulate.submit(findDOMNode(taskForm), event);
        expect(event.preventDefault.callCount).to.equal(1);
      });

      it('should set text field value with an empty string', () => {
        const event = {preventDefault: sinon.spy()};
        taskForm.setState({title: 'foo'});
        Simulate.submit(findDOMNode(taskForm), event);
        expect(taskForm.refs.titleInput.value).to.equal('');
      });
    });
  });
});
