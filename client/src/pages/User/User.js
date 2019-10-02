import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Gallery from '../../components/Gallery/Gallery';
import styles from './User.module.css';

const UserImages = props => {
  return (
    <>
      <header>
        <Navbar />
        <div className={styles['profile']}>
          <img
            src="https://source.unsplash.com/random/200x200?profile"
            alt=""
            className={styles['rounded-thumb']}
          />
          <div className={styles['username']}>Shahzaib</div>
        </div>
      </header>
      <nav className={styles['navbar']}>
        <ul className={styles['nav-list']}>
          <li>
            <NavLink
              exact
              activeClassName={styles['nav-link-active']}
              className={styles['nav-link']}
              to="/users/someid">
              Images
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName={styles['nav-link-active']}
              className={styles['nav-link']}
              to="/users/someid/liked">
              Liked Images
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path={props.match.path} component={Gallery} />
        <Route exact path={props.match.path + '/liked'} component={Gallery} />
      </Switch>
    </>
  );
};

export default UserImages;
