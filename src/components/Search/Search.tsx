import { useEffect, useState } from 'react';

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue) {
      setInputValue(savedValue);
    }
  }, []);

  const handleSearch = () => {
    onSearch(inputValue);
    localStorage.setItem('searchValue', inputValue);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Find..."
      />
      <button onClick={handleSearch} disabled={!inputValue.trim()}>
        Search
      </button>
    </div>
  );
};

export default Search;
