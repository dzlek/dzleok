import { useParams } from 'react-router-dom';
import s from './CardDetails.module.scss';

const CardDetails = () => {
  const { id } = useParams();

  return <div className={s.cardDetails}>DETAILS {id}</div>;
};

export default CardDetails;
