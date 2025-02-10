import { useState, useEffect } from 'react';
import {
  Film,
  Person,
  Vehicle,
  Starship,
  PersonWithDetails,
} from '../types/types';

// Универсальная функция для фетча связанных данных с дженериками
const fetchRelatedData = async <T>(urls: string[]): Promise<T[]> => {
  return Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url);
      return res.json();
    })
  );
};

const useCharacterDetails = (id: string) => {
  const [data, setData] = useState<PersonWithDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Загружаем данные персонажа
        const res = await fetch(`https://swapi.dev/api/people/${id}/`);
        const character: Person = await res.json();

        // Загружаем все связанные данные с типами
        const homeworld = character.homeworld
          ? await fetch(character.homeworld).then((res) => res.json())
          : null;

        const films = await fetchRelatedData<Film>(character.films);
        const species = await fetchRelatedData<string>(character.species);
        const starships = await fetchRelatedData<Starship>(character.starships);
        const vehicles = await fetchRelatedData<Vehicle>(character.vehicles);

        // Обновляем состояние с данными
        setData({
          ...character,
          homeworld,
          films,
          species,
          starships,
          vehicles,
        });
      } catch {
        setError('Error fetching character details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};

export default useCharacterDetails;
