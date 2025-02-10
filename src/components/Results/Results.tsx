import React, { useMemo } from 'react';
import { ResultsProps } from '../../types/types';
import CardList from '../CardList/CardList';
import Pagination from '../Pagination/Pagination';
import { useFetch } from '../../hooks/useFetch';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import s from './Results.module.scss';

const Results: React.FC<ResultsProps> = ({ query }) => {
  const { page } = useParams();
  const navigate = useNavigate();

  const currentPage = useMemo(() => Number(page) || 1, [page]);
  const { data, loading, error } = useFetch(query, currentPage);
  console.log(data);

  if (!page || Number(page) !== currentPage) {
    navigate(`/search/${currentPage}`, { replace: true });
  }

  const handlePrevious = () => {
    if (currentPage > 1) navigate(`/search/${currentPage - 1}`);
  };

  const handleNext = () => {
    navigate(`/search/${currentPage + 1}`);
  };

  if (loading) return <main>Loading...Main API call</main>;
  if (error) return <main>Error: {error}</main>;
  if (!data || !data.results || data.results.length === 0)
    return <main>No results found</main>;

  return (
    <main className={s.results}>
      <div className={s.horizontal}>
        <div className={s.vertical}>
          <CardList data={data} />
          {(data.next || data.previous) && (
            <Pagination
              previous={data.previous ? `/search/${currentPage - 1}` : null}
              next={data.next ? `/search/${currentPage + 1}` : null}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          )}
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default Results;
