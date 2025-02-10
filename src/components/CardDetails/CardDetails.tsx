import { useParams } from 'react-router-dom';
import s from './CardDetails.module.scss';
import useCharacterDetails from '../../hooks/useCharacterDetails';

const CardDetails: React.FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useCharacterDetails(id as string);

  if (loading)
    return (
      <div className={s.cardDetails}>
        Loading details...This is additional API call...
      </div>
    );
  if (error) return <div className={s.cardDetails}>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className={s.cardDetails}>
      <h2>{data.name}</h2>
      <p>Birth Year: {data.birth_year}</p>
      <p>Eye Color: {data.eye_color}</p>
      <p>Gender: {data.gender}</p>
      <p>Height: {data.height} cm</p>
      <p>Weight: {data.mass} kg</p>
      <p>
        Homeworld:{' '}
        {typeof data.homeworld === 'string'
          ? 'Unknown'
          : data.homeworld?.name || 'Unknown'}
      </p>

      <h3>Films:</h3>
      <ul>
        {data.films.map((film) => (
          <li key={film.url}>{film.title}</li>
        ))}
      </ul>

      <h3>Vehicles:</h3>
      <ul>
        {data.vehicles.map((vehicle) => (
          <li key={vehicle.url}>{vehicle.name}</li>
        ))}
      </ul>

      <h3>Starships:</h3>
      <ul>
        {data.starships.map((starship) => (
          <li key={starship.url}>{starship.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CardDetails;
