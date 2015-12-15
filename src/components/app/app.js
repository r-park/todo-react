import React, { Component, PropTypes } from 'react';
import { auth } from 'core/auth';

// @auth()
export class App extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.signOut();
    window.location.replace('/');
  }

  render() {
    const { authenticated, children } = this.props;

    return (
      <div>
        <header className="header">
          <div className="g-row">
            <div className="g-col">
              <h1 className="header__title">Todo React</h1>

              <ul className="header__links">
                {authenticated ? <li><a className="header__link" onClick={this.signOut} href="javascript:">Sign out</a></li> : null}
                <li><a className="header__link header__link--github" href="https://github.com/r-park/todo-react"></a></li>
              </ul>
            </div>
          </div>
        </header>

        <main className="main">{children}</main>
      </div>
    );
  }
}

// workaround until babel 6 supports decorators
export default auth()(App);
