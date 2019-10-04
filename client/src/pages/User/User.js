import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Gallery from '../../components/Gallery/Gallery';
import css from './User.module.css';

const UserImages = props => {
  return (
    <>
      <header>
        <Navbar />
        <div className={css.Profile}>
          <img
            src="https://source.unsplash.com/random/200x200?profile"
            alt=""
            className={css.RoundedThumb}
          />
          <div className={css.Username}>Shahzaib</div>
        </div>
      </header>
      <nav className={css.Navbar}>
        <ul className={css.NavList}>
          <li>
            <NavLink
              exact
              activeClassName={css.NavLinkActive}
              className={css.NavLink}
              to="/users/someid">
              Images
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName={css.NavLinkActive}
              className={css.NavLink}
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
