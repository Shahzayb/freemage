import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../lib/history';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as Search } from '../../assets/images/search.svg';
import { ReactComponent as NotificationBell } from '../../assets/images/bell.svg';
import { ReactComponent as Home } from '../../assets/images/home.svg';
import { ReactComponent as AddPhoto } from '../../assets/images/add-photo.svg';
import css from './Navbar.module.css';

class Navbar extends React.Component {
  onSearch(e) {
    e.preventDefault();
    const searchText = e.target.search.value.trim();
    console.log(searchText);
    if (searchText) {
      history.push(`/s/images/${searchText}`);
    }
  }

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
          <form onSubmit={this.onSearch.bind(this)}>
            <input
              name="search"
              type="text"
              className={css.SearchText}
              placeholder="Search photos"
            />
          </form>
        </div>
        {/* only show notification when logged in */}
        {this.props.isLoggedIn ? (
          <div className={css.Notification}>
            <NotificationBell
              title="notifications"
              className={css.NotificationBell}
            />
            <span className={css.NotificationNumber}>3</span>
          </div>
        ) : null}

        {/* if user is not loggedin then redirect the user to login page */}
        <NavLink
          to={{ pathname: '/upload', state: { modal: true } }}
          className={`${css.UploadBtn} ${css.BigScreen}`}>
          Submit <span className={css.UploadTextBig}>a photo</span>
        </NavLink>

        {/* if user is not loggedin then redirect the user to login page */}
        <NavLink
          to={{ pathname: '/upload', state: { modal: true } }}
          className={css.Mobile}>
          <AddPhoto className={css.AddPhotoIcon} title="upload photo" />
        </NavLink>

        {/* hide this link if user is logged in */}
        {this.props.isLoggedIn ? null : (
          <NavLink to="/login" className={css.PrimaryBtn}>
            Login
          </NavLink>
        )}

        {/* show when logged in */}
        {this.props.isLoggedIn ? (
          <NavLink
            to={`/users/${this.props.userId}`}
            title="view profile / logout">
            <div className={css.Profile}>
              <img
                src={this.props.profilePic}
                alt=""
                className={css.RoundedThumb}
              />
            </div>
          </NavLink>
        ) : null}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  userId: state.auth.userId,
  profilePic: state.auth.profilePic
});

export default connect(mapStateToProps)(Navbar);
