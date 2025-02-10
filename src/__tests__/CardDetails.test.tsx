import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CardDetails from '../components/CardDetails/CardDetails.tsx';
import useCharacterDetails from '../hooks/useCharacterDetails.ts';

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
}));

vi.mock('../hooks/useCharacterDetails');

const mockedUseCharacterDetails = vi.mocked(useCharacterDetails, true);

describe('CardDetails Component', () => {
  it('renders loading state', () => {
    mockedUseCharacterDetails.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<CardDetails />);
    expect(
      screen.getByText(/Loading details...This is additional API call.../i)
    ).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockedUseCharacterDetails.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching character details',
    });

    render(<CardDetails />);
    expect(
      screen.getByText(/Error: Error fetching character details/i)
    ).toBeInTheDocument();
  });

  it('renders character details when data is available', async () => {
    mockedUseCharacterDetails.mockReturnValue({
      data: {
        name: 'Luke Skywalker',
        birth_year: '19 BBY',
        eye_color: 'Blue',
        gender: 'Male',
        height: '172',
        mass: '77',
        homeworld: { name: 'Tatooine' },
        films: [{ title: 'A New Hope', url: 'https://swapi.dev/api/films/1/' }],
        vehicles: [
          { name: 'Speeder', url: 'https://swapi.dev/api/vehicles/14/' },
        ],
        starships: [
          { name: 'X-Wing', url: 'https://swapi.dev/api/starships/12/' },
        ],
        species: ['Human'],
        hair_color: 'Blond',
        skin_color: 'Fair',
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-10T13:52:43.172000Z',
        url: 'https://swapi.dev/api/people/1/',
      },
      loading: false,
      error: null,
    });

    render(<CardDetails />);

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
      expect(screen.getByText(/Birth Year: 19 BBY/)).toBeInTheDocument();
      expect(screen.getByText(/Eye Color: Blue/)).toBeInTheDocument();
      expect(screen.getByText(/Homeworld: Tatooine/)).toBeInTheDocument();
      expect(screen.getByText(/A New Hope/)).toBeInTheDocument();
      expect(screen.getByText(/Speeder/)).toBeInTheDocument();
      expect(screen.getByText(/X-Wing/)).toBeInTheDocument();
    });
  });
});
