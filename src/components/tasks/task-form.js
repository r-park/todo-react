import React, { Component, PropTypes } from 'react';


export class TaskForm extends Component {
  static propTypes = {
    createTask: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {title: ''};

    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.title !== this.state.title;
  }

  clearInput() {
    this.setState({title: ''});
  }

  onChange(event) {
    this.setState({title: event.target.value});
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.createTask(this.state.title);
    this.clearInput();
  }

  render() {
    return (
      <form className="task-form" onSubmit={this.onSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="task-form__input"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="What needs to be done?"
          ref="titleInput"
          type="text"
          value={this.state.title}/>
      </form>
    );
  }
}
