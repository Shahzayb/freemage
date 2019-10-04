import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Search } from '../../assets/images/search.svg';
import css from './MobileSearch.module.css';

const MobileSearch = () => {
  return (
    <div className={css.MobileSearch}>
      <div className={`${css.SearchBar} ${css.BigScreen}`}>
        <Search className={css.SearchIcon} />
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
