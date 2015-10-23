import React, { Component, PropTypes } from 'react';
import { routePaths } from 'config';
import { authActions, authStore } from 'core/auth';


export function auth() {
  return DecoratedComponent => {
    return class extends Component {
      static childContextTypes = {
        authActions: PropTypes.object.isRequired
      };

      constructor(props, context) {
        super(props, context);
        this.state = authStore.state;
      }

      getChildContext() {
        return { authActions };
      }

      componentWillMount() {
        authStore.addListener(this.onAuthChange, this);
      }

      componentWillUnmount() {
        authStore.removeListener(this.onAuthChange);
      }

      onAuthChange(authState) {
        this.setState(authState);
        let path = authState.authenticated ? routePaths.POST_SIGN_IN : routePaths.POST_SIGN_OUT;
        this.props.history.replaceState(null, path);
      }

      render() {
        return (
          <DecoratedComponent
            authenticated={this.state.authenticated}
            {...this.props}
            {...authActions}/>
        );
      }
    };
  };
}
