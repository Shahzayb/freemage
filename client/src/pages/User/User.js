import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, Switch, Route } from 'react-router-dom';
import Gallery from '../../components/Gallery/Gallery';
import Spinner from '../../UI/Spinner';
import {
  fetchUser,
  fetchUserImages,
  fetchUserLikedImages
} from '../../actions/users';
import css from './User.module.css';

class User extends React.Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchUser(this.props.match.params.id);
    }
  }

  render() {
    const user = this.props.user;
    return user ? (
      <>
        <header>
          <div className={css.Profile}>
            <img
              src={user.profilePic}
              alt={user.firstName}
              className={css.RoundedThumb}
            />
            <div className={css.Username}>{user.name}</div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Link className={css.Btn} to="/account">
              Edit profile
            </Link>
            <Link className={css.Btn} to="/logout">
              Logout
            </Link>
          </div>
        </header>
        <nav className={css.Navbar}>
          <ul className={css.NavList}>
            <li>
              <NavLink
                exact
                activeClassName={css.NavLinkActive}
                className={css.NavLink}
                to={`/users/${user._id}`}
              >
                Images
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName={css.NavLinkActive}
                className={css.NavLink}
                to={`/users/${user._id}/likes`}
              >
                Liked Images
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route
            exact
            path={this.props.match.path}
            render={props => {
              const imagesPage = this.props.user.imagesPage;
              return imagesPage ? (
                <Gallery
                  curPage={imagesPage.pagination.curPage}
                  hasMore={imagesPage.pagination.hasMore}
                  fetchNext={page =>
                    this.props.fetchUserImages(page, this.props.match.params.id)
                  }
                  images={imagesPage.images}
                />
              ) : null;
            }}
          />
          <Route
            exact
            path={this.props.match.path + '/likes'}
            render={props => {
              const likesPage = this.props.user.likesPage;
              return likesPage ? (
                <Gallery
                  curPage={likesPage.pagination.curPage}
                  hasMore={likesPage.pagination.hasMore}
                  fetchNext={page =>
                    this.props.fetchUserLikedImages(
                      page,
                      this.props.match.params.id
                    )
                  }
                  images={likesPage.images}
                />
              ) : null;
            }}
          />
        </Switch>
      </>
    ) : (
      <div className={css.SpinnerContainer}>
        <Spinner type="TailSpin" color="#111" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.match.params.id],
  loggedUserId: state.auth.userId
});

const mapDispatchToProps = {
  fetchUser,
  fetchUserImages,
  fetchUserLikedImages
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
