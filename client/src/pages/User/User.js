import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
import Gallery from '../../components/Gallery/Gallery';
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
        </header>
        <nav className={css.Navbar}>
          <ul className={css.NavList}>
            <li>
              <NavLink
                exact
                activeClassName={css.NavLinkActive}
                className={css.NavLink}
                to={`/users/${user._id}`}>
                Images
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName={css.NavLinkActive}
                className={css.NavLink}
                to={`/users/${user._id}/likes`}>
                Liked Images
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route
            exact
            path={this.props.match.path}
            component={props => {
              const imagesPage = this.props.user.imagesPage;
              return imagesPage ? (
                <Gallery
                  hasMore={imagesPage.pagination.hasMore}
                  pageStart={imagesPage.pagination.curPage}
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
            component={props => {
              const likesPage = this.props.user.likesPage;
              return likesPage ? (
                <Gallery
                  hasMore={likesPage.pagination.hasMore}
                  pageStart={likesPage.pagination.curPage}
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
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchUser,
  fetchUserImages,
  fetchUserLikedImages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
