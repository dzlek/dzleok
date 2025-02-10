import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchProps = {
  query: string;
  onSearch: (query: string) => void;
};

const Search = ({ onSearch, query }: SearchProps) => {
  const [inputValue, setInputValue] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
      navigate('/search/1');
    }
  };

  const handleSearch = () => {
    onSearch(inputValue);
    navigate('/search/1');
  };

  return (
    <div className="search">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Find..."
      />
      <button onClick={handleSearch} disabled={!inputValue.trim()}>
        Search
      </button>
    </div>
  );
};

export default Search;
