import { useNavigate, useParams } from 'react-router-dom';
import { CardProps } from '../../types/types';
import s from './Card.module.scss';

const Card = ({ person }: CardProps) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page || 1;

  const handleClick = () => {
    console.log(person.name);
    navigate(`/search/${currentPage}/details`);
  };

  return (
    <div className={s.card} onClick={handleClick}>
      {person.name}
    </div>
  );
};

export default Card;
