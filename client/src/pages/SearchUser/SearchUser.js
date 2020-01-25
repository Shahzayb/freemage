import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { searchUser } from '../../actions/search';
import UserList from '../../components/UserList/UserList';
import css from './SearchUser.module.css';

export class SearchUser extends Component {
  loadUsers(page) {
    const { searchTerm, searchUser } = this.props;
    searchUser(page, searchTerm);
  }

  render() {
    const { searchTerm, searchData } = this.props;
    const head = (
      <Helmet>
        <title>Freemage - Search user</title>
        <meta name="description" content="Search any user by their full name" />
      </Helmet>
    );

    return (
      <>
        {head}
        <header className={css.Header}>
          <h1>
            Search result for :{'  '}
            <span className={css.BigText}>"{searchTerm}"</span>
          </h1>
        </header>
        <nav className={css.Navbar}>
          <ul className={css.NavList}>
            <li>
              <NavLink
                exact
                activeClassName={css.NavLinkActive}
                className={css.NavLink}
                to={`/s/images/${searchTerm}`}
              >
                Images
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName={css.NavLinkActive}
                className={css.NavLink}
                to={`/s/users/${searchTerm}`}
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
        <hr />
        <UserList
          curPage={searchData ? searchData.userPagination.curPage : 0}
          hasMore={searchData ? searchData.userPagination.hasMore : true}
          fetchNext={this.loadUsers.bind(this)}
          users={searchData ? searchData.users : []}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const searchTerm = ownProps.match.params.searchTerm.trim();
  let searchData = state.search;

  if (searchData.userSearchTerm !== searchTerm) {
    searchData = null;
  }
  return {
    searchTerm,
    searchData
  };
};

const mapDispatchToProps = { searchUser };

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
