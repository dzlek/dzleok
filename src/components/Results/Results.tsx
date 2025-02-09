import React from 'react';
import { ResultsProps } from '../../types/types';

const Results: React.FC<ResultsProps> = ({ data, loading, error }) => {
  console.log('data:', data);

  if (loading) return <main>Loading...</main>;
  if (error) return <main>Error: {error}</main>;
  if (!data || !data.results || data.results.length === 0)
    return <main>No results found</main>;

  return (
    <main>
      {data.results.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </main>
  );
};

export default Results;
