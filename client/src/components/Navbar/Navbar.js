import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className={styles['nav-container']}>
        <Link to="/" className={`${styles['brand']} ${styles['nav-link']}`}>
          <i className={styles['brand-logo']}></i>
          <span>Freemage</span>
        </Link>

        <ul className={styles['nav-list']}>
          <li>
            <Link
              to={{ pathname: '/upload', state: { modal: true } }}
              className={styles['nav-link']}>
              Upload
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles['nav-link']}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
