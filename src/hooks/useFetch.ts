import { useState, useEffect } from 'react';
import { ApiResponse } from '../types/types';

export const useFetch = (query: string, page: number = 1) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setData(null);
    setError(null);

    fetch(`https://swapi.dev/api/people/?search=${query}&page=${page}`)
      .then((res) => res.json())
      .then((result: ApiResponse) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query, page]);

  return { data, loading, error };
};
