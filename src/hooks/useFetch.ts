import { useState, useEffect } from 'react';
import { ApiResponse } from '../types/types';

export const useFetch = (query: string) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setData(null);
    setError(null);

    fetch(`https://swapi.dev/api/people/?search=${query}`)
      .then((res) => res.json())
      .then((result: ApiResponse) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return { data, loading, error };
};
