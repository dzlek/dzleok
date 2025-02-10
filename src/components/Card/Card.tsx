import { useNavigate, useParams } from 'react-router-dom';
import { CardProps } from '../../types/types';
import s from './Card.module.scss';

const Card = ({ person }: CardProps) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page || 1;
  const { url } = person;
  const id = url.split('/').slice(-2, -1)[0];

  const handleClick = () => {
    console.log(person.name);
    navigate(`/search/${currentPage}/details/${id}`);
    console.log(id);
  };

  return (
    <div className={s.card} onClick={handleClick}>
      {person.name}
    </div>
  );
};

export default Card;
