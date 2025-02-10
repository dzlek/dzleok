import { createRoot } from 'react-dom/client';
import '../index.css';
import App from '../App';

describe('main.tsx', () => {
  it('renders App component', () => {
    document.body.innerHTML = '<div id="root"></div>';

    const rootElement = document.getElementById('root');
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(<App />);
      expect(rootElement).toContainHTML('<div id="root">');
    }
  });

  it('throws an error when root element is not found', () => {
    document.body.innerHTML = '';

    expect(() => {
      const rootElement = document.getElementById('root');
      if (!rootElement) {
        throw new Error('Element with ID "root" not found!');
      }
    }).toThrow('Element with ID "root" not found!');
  });
});
