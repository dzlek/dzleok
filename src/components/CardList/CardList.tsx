import { CardListProps } from '../../types/types';
import s from './CardList.module.scss';

const CardList = ({ person }: CardListProps) => {
  const handleClick = () => {
    console.log(person.name);
  };

  return (
    <div className={s.cardItem} onClick={handleClick}>
      {person.name}
    </div>
  );
};

export default CardList;
