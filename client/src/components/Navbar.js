import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.nav = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        this.nav.current.style.backgroundColor = '#fff';
      } else {
        this.nav.current.style.backgroundColor = '';
      }
    });
  }
  render() {
    return (
      <nav className="nav-container" ref={this.nav}>
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
