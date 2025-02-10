export interface Film {
  title: string;
  url: string;
}

export interface Vehicle {
  name: string;
  url: string;
}

export interface Starship {
  name: string;
  url: string;
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PersonWithDetails
  extends Omit<
    Person,
    'films' | 'species' | 'starships' | 'vehicles' | 'homeworld'
  > {
  films: Film[];
  species: string[];
  starships: Starship[];
  vehicles: Vehicle[];
  homeworld: string | { name: string };
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface ResultsProps {
  query: string;
}

export interface CardProps {
  person: Person;
}
