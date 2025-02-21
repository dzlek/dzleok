import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  throw new Error('Element with ID "root" not found!');
}
