import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../features/selectedItemsSlice';
import { api } from '../services/api';
import CardList from '../components/CardList/CardList';
import { ApiResponse } from '../types/types';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

describe('CardList component', () => {
  test('renders the specified number of cards', () => {
    const mockData: ApiResponse = {
      count: 3,
      next: null,
      previous: null,
      results: [
        {
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
          created: '',
          edited: '',
          url: '',
        },
        {
          name: 'Darth Vader',
          height: '202',
          mass: '136',
          hair_color: 'none',
          skin_color: 'white',
          eye_color: 'yellow',
          birth_year: '41.9BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: '',
          edited: '',
          url: '',
        },
        {
          name: 'Leia Organa',
          height: '150',
          mass: '49',
          hair_color: 'brown',
          skin_color: 'light',
          eye_color: 'brown',
          birth_year: '19BBY',
          gender: 'female',
          homeworld: 'https://swapi.dev/api/planets/2/',
          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: '',
          edited: '',
          url: '',
        },
      ],
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList data={mockData} />
        </MemoryRouter>
      </Provider>
    );

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });
});
