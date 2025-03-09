import { ApiResponse } from '../../types/types';
import Card from '../Card/Card';
import s from './Cardlist.module.scss';

const CardList = ({ data }: { data: ApiResponse }) => {
  return (
    <div className={s.cardList}>
      {data.results.map((person) => (
        <article key={person.name}>
          <Card person={person} />
        </article>
      ))}
    </div>
  );
};

export default CardList;
