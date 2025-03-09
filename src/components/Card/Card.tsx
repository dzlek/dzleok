import { useNavigate, useParams } from 'react-router-dom';
import { CardProps } from '../../types/types';
import s from './Card.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { selectItem, unselectItem } from '../../features/selectedItemsSlice';

const Card = ({ person }: CardProps) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page || 1;

  const id = person.url?.split('/').slice(-2, -1)[0] || '1';

  const dispatch = useDispatch<AppDispatch>();

  const isSelected = useSelector((state: RootState) =>
    state.selectedItems.items.some((item) => item.id === id)
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (isSelected) {
      dispatch(unselectItem(id));
    } else {
      dispatch(selectItem({ id, name: person.name }));
    }
  };
  const handleClick = () => {
    navigate(`/search/${currentPage}/details/${id}`);
  };

  return (
    <div className={s.card} onClick={handleClick}>
      <input
        className={s.cardCheckbox}
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      {person.name}
    </div>
  );
};

export default Card;
