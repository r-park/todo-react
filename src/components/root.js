import createBrowserHistory from 'history/lib/createBrowserHistory';
import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import { authRouteResolver } from 'core/auth';
import App from './app/app';
import { SignIn } from './sign-in/sign-in';
import { Tasks } from './tasks/tasks';


export class Root extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Route path="/" component={App} onEnter={authRouteResolver}>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/tasks" component={Tasks}/>
        </Route>
      </Router>
    );
  }
}
