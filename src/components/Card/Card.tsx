import { useNavigate, useParams } from 'react-router-dom';
import { CardProps } from '../../types/types';
import s from './Card.module.scss';

const Card = ({ person }: CardProps) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page || 1;

  const id = person.url?.split('/').slice(-2, -1)[0] || '1';

  const handleClick = () => {
    navigate(`/search/${currentPage}/details/${id}`);
  };

  return (
    <div className={s.card} onClick={handleClick}>
      {person.name}
    </div>
  );
};

export default Card;
