import React, { useState, useEffect } from 'react';
import s from './ThrowError.module.scss';

const ThrowError: React.FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (hasError) {
      throw new Error('INDEED Everything went wrong because of ThrowError!');
    }
  }, [hasError]);

  return (
    <button className={s.errorButton} onClick={() => setHasError(true)}>
      Throw error
    </button>
  );
};

export default ThrowError;
