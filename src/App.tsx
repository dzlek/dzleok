import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';

function App() {
  function handleError() {
    throw new Error('Something went wrong');
  }

  return (
    <>
      <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
        <Header />
        <button onClick={handleError}>Error Button</button>
      </ErrorBoundary>
    </>
  );
}

export default App;
