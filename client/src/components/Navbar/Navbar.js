import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as Search } from '../../assets/images/search.svg';
import { ReactComponent as NotificationBell } from '../../assets/images/bell.svg';
import { ReactComponent as Home } from '../../assets/images/home.svg';
import { ReactComponent as AddPhoto } from '../../assets/images/add-photo.svg';
import css from './Navbar.module.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className={css.NavContainer}>
        <NavLink to="/" className={`${css.BrandLink} ${css.BigScreen}`}>
          <Logo className={css.BrandLogo}></Logo>
          <span className={css.BrandName}>Freemage</span>
        </NavLink>

        <NavLink to="/" className={css.Mobile}>
          <Home title="home page" />
        </NavLink>

        <NavLink to="/mobile-search" className={css.Mobile}>
          <Search title="search photos by tags" />
        </NavLink>

        <div className={`${css.SearchBar} ${css.BigScreen}`}>
          <Search className={css.SearchIcon} />
          <input
            // add onSubmit handler here
            type="text"
            className={css.SearchText}
            placeholder={'Search photos'}
          />
        </div>

        <div className={css.Notification}>
          <NotificationBell
            title="notifications"
            className={css.NotificationBell}
          />
          <span className={css.NotificationNumber}>3</span>
        </div>

        <NavLink
          to={{ pathname: '/upload', state: { modal: true } }}
          className={`${css.UploadBtn} ${css.BigScreen}`}>
          Submit <span className={css.UploadTextBig}>a photo</span>
        </NavLink>

        <NavLink
          to={{ pathname: '/upload', state: { modal: true } }}
          className={css.Mobile}>
          <AddPhoto className={css.AddPhotoIcon} title="upload photo" />
        </NavLink>

        <NavLink to="/login" className={`${css.PrimaryBtn} ${css.BigScreen}`}>
          Login
        </NavLink>
      </nav>
    );
  }
}

export default Navbar;
