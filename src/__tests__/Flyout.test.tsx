import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi, expect, describe, it, beforeEach } from 'vitest';
import Flyout from '../components/Flyout/Flyout';
import selectedItemsReducer, {
  unselectAll,
} from '../features/selectedItemsSlice';

if (!globalThis.URL.createObjectURL) {
  globalThis.URL.createObjectURL = () => 'blob:http://test';
}

describe('Flyout component', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { selectedItems: selectedItemsReducer },
      preloadedState: { selectedItems: { items: [] } },
    });
  });

  it('does not render when no items are selected', () => {
    const { container } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when items are selected', () => {
    store = configureStore({
      reducer: { selectedItems: selectedItemsReducer },
      preloadedState: {
        selectedItems: { items: [{ id: '1', name: 'Luke Skywalker' }] },
      },
    });
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Download/i })
    ).toBeInTheDocument();
  });

  it('dispatches unselectAll when "Unselect all" button is clicked', () => {
    store = configureStore({
      reducer: { selectedItems: selectedItemsReducer },
      preloadedState: {
        selectedItems: { items: [{ id: '1', name: 'Luke Skywalker' }] },
      },
    });
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /Unselect all/i }));
    expect(dispatchSpy).toHaveBeenCalledWith(unselectAll());
  });

  it('triggers download when "Download" button is clicked', () => {
    store = configureStore({
      reducer: { selectedItems: selectedItemsReducer },
      preloadedState: {
        selectedItems: { items: [{ id: '1', name: 'Luke Skywalker' }] },
      },
    });
    const createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:http://test');
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /Download/i }));
    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    createObjectURLSpy.mockRestore();
    clickSpy.mockRestore();
  });
});
