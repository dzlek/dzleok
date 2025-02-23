import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { unselectAll } from '../../features/selectedItemsSlice';

import s from './Flyout.module.scss';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  if (selectedItems.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const csvHeader = 'ID,Name\n';
    const csvRows = selectedItems
      .map((item) => `${item.id},"${item.name}"`)
      .join('\n');
    const csvContent = csvHeader + csvRows;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const fileName = `${selectedItems.length}_items.csv`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={s.flyout}>
      <span>
        {selectedItems.length}{' '}
        {selectedItems.length === 1 ? 'item is' : 'items are'} selected
      </span>
      <div>
        <button className={s.btn} onClick={handleUnselectAll}>
          Unselect all
        </button>
        <button className={s.btn} onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
