import { useState, useEffect } from 'react';

const useLocalStorage = () => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchValue');
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  const updateLocalStorage = (newQuery: string) => {
    setQuery(newQuery);
    localStorage.setItem('searchValue', newQuery);
  };

  return { query, updateLocalStorage };
};

export default useLocalStorage;
