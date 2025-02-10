import React from 'react';
import s from './Pagination.module.scss';

interface PaginationProps {
  previous: string | null;
  next: string | null;
  // onPageChange: (direction: 'prev' | 'next') => void;
}

const Pagination: React.FC<PaginationProps> = ({
  previous,
  next,
  // onPageChange,
}) => {
  const handleClick = (direction: 'prev' | 'next') => {
    console.log('pagination to', direction);

    // onPageChange(direction);
  };

  return (
    <>
      <button
        className={s.paginationButton}
        onClick={() => handleClick('prev')}
        disabled={!previous}
      >
        Prev
      </button>
      <button
        className={s.paginationButton}
        onClick={() => handleClick('next')}
        disabled={!next}
      >
        Next
      </button>
    </>
  );
};

export default Pagination;
