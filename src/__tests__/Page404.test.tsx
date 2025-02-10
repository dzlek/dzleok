import { render, screen } from '@testing-library/react';
import Page404 from '../components/Page404/Page404';

describe('Page404 Component', () => {
  it('renders the 404 message', () => {
    render(<Page404 />);
    expect(
      screen.getByText('Page not found. You are on 404 page.')
    ).toBeInTheDocument();
  });
});
