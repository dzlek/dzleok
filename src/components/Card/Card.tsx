import { CardProps } from '../../types/types';
import s from './Card.module.scss';

const Card = ({ person }: CardProps) => {
  const handleClick = () => {
    console.log(person.name);
  };

  return (
    <div className={s.card} onClick={handleClick}>
      {person.name}
    </div>
  );
};

export default Card;
