import { ApiResponse } from '../../types/types';
import Card from '../Card/Card';
import s from './CardList.module.scss';

const CardList = ({ data }: { data: ApiResponse }) => {
  return (
    <div className={s.cardList}>
      {data.results.map((person) => (
        <div key={person.name}>
          <Card person={person} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
