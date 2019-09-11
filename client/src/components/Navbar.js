import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="nav-container">
        <ul className="navbar">
          <li>
            <Link to="/" className="brand nav-link">
              <i className="brand-logo"></i>
              <span className="brand-name">Freemage</span>
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: '/upload', state: { modal: true } }}
              className="nav-link">
              Upload
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
