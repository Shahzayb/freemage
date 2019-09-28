import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="nav-container">
        <div className="navbar">
          <Link to="/" className="brand nav-link">
            <i className="brand-logo"></i>
            <span className="brand-name">Freemage</span>
          </Link>

          <ul className="nav">
            <li>
              <Link
                to={{ pathname: '/upload', state: { modal: true } }}
                className="nav-link">
                Upload
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
