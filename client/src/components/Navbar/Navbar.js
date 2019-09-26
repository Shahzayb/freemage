import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import GoogleLogin from '../GoogleLogin';

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
              <GoogleLogin />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
