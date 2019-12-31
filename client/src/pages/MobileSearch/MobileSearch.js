import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ReactComponent as SearchIcon } from '../../assets/images/search.svg';
import css from './MobileSearch.module.css';

const MobileSearch = () => {
  const head = <Helmet>
        <title>Freemage - Search image</title>
        <meta name="description" content="Search any image by their tags" />
      </Helmet>
  return (
    <div className={css.MobileSearch}>
      {head}
      <div className={`${css.SearchBar} ${css.BigScreen}`}>
        <SearchIcon className={css.SearchIcon} />
        <input
          // add onSubmit handler here
          type="text"
          className={css.SearchText}
          placeholder={'Search photos'}
        />
      </div>
      <Link className={css.CancelBtn} to="/">
        Cancel
      </Link>
    </div>
  );
};

export default MobileSearch;
