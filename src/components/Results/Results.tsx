import React from 'react';
import { ResultsProps } from '../../types/types';
import CardList from '../CardList/CardList';
import Pagination from '../Pagination/Pagination';
import { useFetch } from '../../hooks/useFetch';

const Results: React.FC<ResultsProps> = ({ query }) => {
  const { data, loading, error } = useFetch(query);
  console.log('data:', data);

  if (loading) return <main>Loading...</main>;
  if (error) return <main>Error: {error}</main>;
  if (!data || !data.results || data.results.length === 0)
    return <main>No results found</main>;

  return (
    <main>
      {data.results.map((person) => (
        <div key={person.name}>
          <CardList person={person} />
        </div>
      ))}
      <Pagination previous={data.previous} next={data.next} />
    </main>
  );
};

export default Results;
