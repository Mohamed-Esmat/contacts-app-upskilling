import { useState } from 'react';
import classes from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    onSearch(newValue);
  };

  return (
    <input
      type="text"
      className={classes['search__input']}
      placeholder="Search by Name"
      value={searchValue}
      onChange={(e) => handleInputChange(e)}
    />
  );
};

export default SearchBar;
