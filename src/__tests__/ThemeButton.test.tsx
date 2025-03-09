import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../components/ThemeContext/ThemeProvider';
import ThemeButton from '../components/ThemeButton/ThemeButton';

describe('ThemeButton', () => {
  it('renders with default theme light', () => {
    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>
    );
    const selectElement = screen.getByLabelText(/theme:/i) as HTMLSelectElement;
    expect(selectElement.value).toBe('light');
  });

  it('updates theme to dark when selected', async () => {
    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>
    );
    const selectElement = screen.getByLabelText(/theme:/i) as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: 'dark' } });
    await waitFor(() => {
      expect(selectElement.value).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });
});
