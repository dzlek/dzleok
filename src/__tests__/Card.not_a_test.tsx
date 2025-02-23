import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card/Card';
import { CardProps } from '../types/types';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

const mockPerson: CardProps['person'] = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

describe('Card component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockImplementation(() => mockNavigate);
    vi.mocked(useParams).mockImplementation(() => ({ page: '1' }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Card person={mockPerson} />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('navigates to the details page on click', () => {
    render(
      <MemoryRouter>
        <Card person={mockPerson} />
      </MemoryRouter>
    );

    const card = screen.getByText('Luke Skywalker');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/search/1/details/1');
  });
});
