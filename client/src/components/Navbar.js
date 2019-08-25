import React from 'react';

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
            <a href="#!" className="brand nav-link">
              <i className="brand-logo"></i>
              <span className="brand-name">Freemage</span>
            </a>
          </li>
          <li>
            <a href="#!" className="nav-link">
              Upload
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
