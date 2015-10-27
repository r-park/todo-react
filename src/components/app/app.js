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

              <ul className="header__links">
                {authenticated ? <li><a className="header__link" onClick={signOut} href="javascript:">Sign out</a></li> : null}
                <li><a className="header__link header__link--github" href="https://github.com/r-park/todo-react-redux"></a></li>
              </ul>
            </div>
          </div>
        </header>

        <main className="main">{children}</main>
      </div>
    );
  }
}
