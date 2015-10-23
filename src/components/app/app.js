import React, { Component, PropTypes } from 'react';
import { auth } from 'core/auth';


@auth()
export class App extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  render() {
    const { authenticated, children, signOut } = this.props;

    return (
      <div>
        <header className="header">
          <div className="g-row">
            <div className="g-col">
              <h1 className="header__title">Todo React</h1>
              <a className="header__link" href="https://github.com/r-park/todo-react"></a>
            </div>
          </div>
        </header>

        <main className="main">{children}</main>

        <footer className="footer">
          <div className="g-row">
            <div className="g-col">
              {authenticated ? <a onClick={signOut} href="javascript:">Sign out</a> : null}
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
