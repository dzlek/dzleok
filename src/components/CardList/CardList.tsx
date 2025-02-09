import { CardListProps } from '../../types/types';

const CardList = ({ person }: CardListProps) => {
  const handleClick = () => {
    console.log(person.name);
  };

  return <div onClick={handleClick}>{person.name}</div>;
};

export default CardList;
