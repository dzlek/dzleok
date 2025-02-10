import { render, screen, fireEvent } from '@testing-library/react';
import ThrowError from '../components/ThrowError/ThrowError';

describe('ThrowError Component', () => {
  it('renders the button', () => {
    render(<ThrowError />);
    expect(screen.getByText('Throw error')).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<ThrowError />);
      fireEvent.click(screen.getByText('Throw error'));
    }).toThrow('INDEED Everything went wrong because of ThrowError!');

    consoleError.mockRestore();
  });
});
