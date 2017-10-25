import React, { Component } from 'react'
import { Link } from 'react-router'
import {
    HiddenOnlyAuth,
    VisibleOnlyAuth
} from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/components/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/components/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
      const { children } = this.props;

      const OnlyAuthLinks = VisibleOnlyAuth(() =>
          <span>
            <li className="pure-menu-item">
              <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
            </li>
            <li className="pure-menu-item">
              <Link to="/profile" className="pure-menu-link">Profiles</Link>
            </li>
            <LogoutButtonContainer />
          </span>
      )

      const OnlyGuestLinks = HiddenOnlyAuth(() =>
        <span>
            <li className="pure-menu-item">
                <Link to="/signup" className="pure-menu-link">Sign Up</Link>
            </li>
            <LoginButtonContainer />
        </span>
      )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <Link to="/" className="pure-menu-heading pure-menu-link">Ravens Exchange</Link>
          {/*<ul className="pure-menu-list navbar-right">*/}
            {/*<OnlyGuestLinks />*/}
            {/*<OnlyAuthLinks />*/}
          {/*</ul>*/}
        </nav>
        {/* includes index and all child routes*/}
        {children}
      </div>
    );
  }
}

export default App
