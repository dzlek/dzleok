import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

describe('Pagination Component', () => {
  it('should render buttons with correct disabled states', () => {
    const { rerender } = render(
      <Pagination
        previous="page1"
        next="page3"
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />
    );

    expect(screen.getByText('Prev')).not.toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();

    rerender(
      <Pagination
        previous={null}
        next={null}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />
    );

    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('should call navigation handlers on button clicks', () => {
    const mockPrev = vi.fn();
    const mockNext = vi.fn();

    render(
      <Pagination
        previous="page1"
        next="page3"
        onPrevious={mockPrev}
        onNext={mockNext}
      />
    );

    fireEvent.click(screen.getByText('Prev'));
    fireEvent.click(screen.getByText('Next'));

    expect(mockPrev).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
