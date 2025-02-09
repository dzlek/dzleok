import useLocalStorage from '../../hooks/useLocalStorage';

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const { query, updateLocalStorage } = useLocalStorage();

  const handleSearch = () => {
    onSearch(query);
    updateLocalStorage(query);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={(e) => updateLocalStorage(e.target.value)}
        placeholder="Find..."
      />
      <button onClick={handleSearch} disabled={!query.trim()}>
        Search
      </button>
    </div>
  );
};

export default Search;
