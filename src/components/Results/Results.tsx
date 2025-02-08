import React from 'react';

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface ResultsProps {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Person[];
  } | null;
  loading: boolean;
  error: string | null;
}

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
