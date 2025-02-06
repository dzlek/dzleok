import React, { useState } from 'react';

type SearchProps = {
  initialValue?: string;
};

const Search: React.FC<SearchProps> = ({ initialValue = '' }) => {
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('searchValue') || initialValue
  );

  const handleSearch = () => {
    localStorage.setItem('searchValue', inputValue);
    console.log('SearchInput:', inputValue);
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
};

export default Search;
