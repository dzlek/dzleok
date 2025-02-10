import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CardDetails from '../components/CardDetails/CardDetails.tsx';
import useCharacterDetails from '../hooks/useCharacterDetails.ts';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useParams: () => ({ id: '1', page: '1' }),
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../hooks/useCharacterDetails');

const mockedUseCharacterDetails = vi.mocked(useCharacterDetails);

describe('CardDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    mockedUseCharacterDetails.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Loading details...This is additional API call.../i)
    ).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockedUseCharacterDetails.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching data',
    });

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    expect(screen.getByText(/Error: Error fetching data/i)).toBeInTheDocument();
  });

  it('renders character details correctly on successful load', async () => {
    mockedUseCharacterDetails.mockReturnValue({
      data: {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        eye_color: 'blue',
        gender: 'male',
        height: '172',
        mass: '77',
        homeworld: { name: 'Tatooine' },
        films: [{ title: 'A New Hope', url: '1' }],
        vehicles: [{ name: 'Snowspeeder', url: '1' }],
        starships: [{ name: 'X-wing', url: '1' }],
        species: ['Human'],
        hair_color: 'blond',
        skin_color: 'fair',
        created: '2014-12-09',
        edited: '2014-12-10',
        url: '1',
      },
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
      expect(screen.getByText(/Eye Color: blue/i)).toBeInTheDocument();
      expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
      expect(screen.getByText(/Height: 172 cm/i)).toBeInTheDocument();
      expect(screen.getByText(/Weight: 77 kg/i)).toBeInTheDocument();
      expect(screen.getByText(/Homeworld: Tatooine/i)).toBeInTheDocument();

      expect(screen.getByText('Films:')).toBeInTheDocument();
      expect(screen.getByText('A New Hope')).toBeInTheDocument();

      expect(screen.getByText('Vehicles:')).toBeInTheDocument();
      expect(screen.getByText('Snowspeeder')).toBeInTheDocument();

      expect(screen.getByText('Starships:')).toBeInTheDocument();
      expect(screen.getByText('X-wing')).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument();
    });
  });
});
