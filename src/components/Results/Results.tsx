import React, { useEffect, useState } from 'react';
import { ResultsProps } from '../../types/types';
import CardList from '../CardList/CardList';
import Pagination from '../Pagination/Pagination';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import s from './Results.module.scss';

const Results: React.FC<ResultsProps> = ({ query }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, loading, error } = useFetch(query, currentPage);
  const navigate = useNavigate();
  console.log('data:', data);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    navigate(`/search/${currentPage}`);
  }, [currentPage, navigate]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading) return <main>Loading...</main>;
  if (error) return <main>Error: {error}</main>;
  if (!data || !data.results || data.results.length === 0)
    return <main>No results found</main>;

  return (
    <main className={s.results}>
      <CardList data={data} />
      {(data.next || data.previous) && (
        <Pagination
          previous={data.previous ? `/search/${currentPage - 1}` : null}
          next={data.next ? `/search/${currentPage + 1}` : null}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </main>
  );
};

export default Results;
