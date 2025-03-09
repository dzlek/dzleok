import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { ThemeProvider } from '../components/ThemeContext/ThemeProvider';
import { ThemeContext } from '../components/ThemeContext/ThemeContext';

describe('ThemeProvider', () => {
  it('renders children and sets initial theme to light', () => {
    const TestComponent = () => {
      const { theme } = useContext(ThemeContext) as {
        theme: string;
        setTheme: React.Dispatch<React.SetStateAction<string>>;
      };
      return <div data-testid="theme">Current theme: {theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe(
      'Current theme: light'
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('updates theme and data-theme when setTheme is called', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useContext(ThemeContext) as {
        theme: string;
        setTheme: React.Dispatch<React.SetStateAction<string>>;
      };
      return (
        <div>
          <div data-testid="theme">Current theme: {theme}</div>
          <button onClick={() => setTheme('dark')}>Set dark theme</button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe(
      'Current theme: light'
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    fireEvent.click(screen.getByText('Set dark theme'));

    expect(screen.getByTestId('theme').textContent).toBe('Current theme: dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
