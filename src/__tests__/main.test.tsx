import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { vi, expect, describe, it, beforeEach, afterEach } from 'vitest';

vi.mock('../App.tsx', () => {
  return {
    default: () => <div data-testid="app">Mocked App</div>,
  };
});

describe('main.tsx', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.resetModules();
  });

  it('renders App component inside Provider when element with id="root" exists', async () => {
    await import('../main');
    const appElement = await waitFor(() => screen.getByTestId('app'));
    expect(appElement).toBeInTheDocument();
    expect(appElement).toHaveTextContent('Mocked App');
  });

  it('throws error if element with id="root" is missing', async () => {
    document.body.innerHTML = '';
    await expect(import('../main')).rejects.toThrow(
      'Element with ID "root" not found!'
    );
  });
});
