import React from 'react';
import s from './Pagination.module.scss';

interface PaginationProps {
  previous: string | null;
  next: string | null;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  previous,
  next,
  onPrevious,
  onNext,
}) => {
  return (
    <div>
      <button
        className={s.paginationButton}
        onClick={onPrevious}
        disabled={!previous}
      >
        Prev
      </button>
      <button className={s.paginationButton} onClick={onNext} disabled={!next}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
