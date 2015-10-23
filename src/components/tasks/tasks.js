import React, { Component, PropTypes } from 'react';
import { taskActions, TaskStore } from 'core/task';
import { TaskFilters } from './task-filters';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';


export class Tasks extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.taskStore = new TaskStore();
    this.state = this.taskStore.state;
  }

  componentDidMount() {
    this.taskStore.addListener(this.setState, this);
  }

  componentWillUnmount() {
    this.taskStore.removeListener(this.setState);
  }

  render() {
    const { filter } = this.props.location.query;
    const { tasks } = this.state;

    return (
      <div className="g-row">
        <div className="g-col">
          <TaskForm {...taskActions}/>
        </div>

        <div className="g-col">
          <TaskFilters filter={filter}/>
          <TaskList filter={filter} tasks={tasks} {...taskActions}/>
        </div>
      </div>
    );
  }
}
