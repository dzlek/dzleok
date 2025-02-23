import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Search from '../components/Search/Search';

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  const renderSearch = (query = '') =>
    render(
      <BrowserRouter>
        <Search query={query} onSearch={mockOnSearch} />
      </BrowserRouter>
    );

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders the search input and button', () => {
    renderSearch();
    expect(screen.getByPlaceholderText('Find...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('updates the input value as the user types', () => {
    renderSearch();
    const input = screen.getByPlaceholderText('Find...');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');
  });

  it('calls onSearch and navigates when enter key is pressed', () => {
    renderSearch('initial query');
    const input = screen.getByPlaceholderText('Find...');
    fireEvent.change(input, { target: { value: 'new query' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledWith('new query');
    expect(window.location.pathname).toBe('/search/1');
  });

  it('calls onSearch and navigates when search button is clicked', () => {
    renderSearch('initial query');
    const input = screen.getByPlaceholderText('Find...');
    const button = screen.getByText('Search');
    fireEvent.change(input, { target: { value: 'new query' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('new query');
    expect(window.location.pathname).toBe('/search/1');
  });

  it('disables search button when input is empty or whitespace', () => {
    renderSearch();
    const button = screen.getByText('Search');

    fireEvent.change(screen.getByPlaceholderText('Find...'), {
      target: { value: ' ' },
    });
    expect(button).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText('Find...'), {
      target: { value: '' },
    });
    expect(button).toBeDisabled();
  });
});
