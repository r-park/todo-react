import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';


export class TaskItem extends Component {
  static propTypes = {
    deleteTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {editing: false};

    this.delete = this.delete.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.task !== this.props.task ||
           nextState.editing !== this.state.editing;
  }

  delete() {
    this.props.deleteTask(this.props.task);
  }

  editTitle() {
    this.setState({editing: true});
  }

  saveTitle(event) {
    if (this.state.editing) {
      const { task } = this.props;
      const title = event.target.value.trim();

      if (title.length && title !== task.title) {
        this.props.updateTask(task, {title});
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({editing: false});
  }

  toggleStatus() {
    const { task } = this.props;
    this.props.updateTask(task, {
      completed: !task.completed
    });
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.saveTitle(event);
    }
    else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  renderTitle(task) {
    return (
      <div
        className="task-item__title"
        ref="titleText"
        tabIndex="0">{task.title}</div>
    );
  }

  renderTitleInput(task) {
    return (
      <input
        autoComplete="off"
        autoFocus
        className="task-item__input"
        defaultValue={task.title}
        maxLength="64"
        onBlur={this.saveTitle}
        onKeyUp={this.onKeyUp}
        ref="titleInput"
        type="text"/>
    );
  }

  render() {
    const { editing } = this.state;
    const { task } = this.props;

    return (
      <div className={classNames('task-item', {'task-item--completed': task.completed, 'task-item--editing': editing})} tabIndex="0">
        <div className="cell">
          <button
            aria-hidden={editing}
            aria-label="Mark task as completed"
            className={classNames('task-item__button', {'hide': editing})}
            onClick={this.toggleStatus}
            ref="toggleStatusButton"
            type="button">
            <svg className={classNames('icon', {'icon--active': task.completed})} width="24" height="24" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
            </svg>
          </button>
        </div>

        <div className="cell">
          {editing ? this.renderTitleInput(task) : this.renderTitle(task)}
        </div>

        <div className="cell">
          <button
            aria-hidden={!editing}
            aria-label="Cancel editing"
            className={classNames('task-item__button', {'hide': !editing})}
            onClick={this.stopEditing}
            ref="cancelEditButton"
            type="button">
            <svg className="icon"  width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Edit task"
            className={classNames('task-item__button', {'hide': editing})}
            onClick={this.editTitle}
            ref="editButton"
            type="button">
            <svg className="icon"  width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Delete task"
            className={classNames('task-item__button', {'hide': editing})}
            onClick={this.delete}
            ref="deleteButton"
            type="button">
            <svg className="icon"  width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
