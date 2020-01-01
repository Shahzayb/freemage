import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ReactComponent as SearchIcon } from '../../assets/images/search.svg';
import css from './MobileSearch.module.css';

const MobileSearch = ({ history }) => {
  const onSearch = e => {
    e.preventDefault();
    const searchText = e.target.search.value.trim();
    if (searchText) {
      history.push(`/s/images/${searchText}`);
    }
  };

  const head = (
    <Helmet>
      <title>Freemage - Search image</title>
      <meta name="description" content="Search any image by their tags" />
    </Helmet>
  );
  return (
    <div className={css.MobileSearch}>
      {head}
      <div className={`${css.SearchBar} ${css.BigScreen}`}>
        <SearchIcon className={css.SearchIcon} />
        <form onSubmit={onSearch}>
          <input
            name="search"
            type="text"
            className={css.SearchText}
            placeholder="Search photos"
          />
        </form>
      </div>
      <Link className={css.CancelBtn} to="/">
        Cancel
      </Link>
    </div>
  );
};

export default MobileSearch;
