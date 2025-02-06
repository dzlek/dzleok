import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Results from './components/Results/Results';

function App() {
  function handleError() {
    throw new Error('wrong');
  }

  return (
    <div className="app">
      <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
        <Header />
        <Results />
        <button onClick={handleError}>Error Button</button>
      </ErrorBoundary>
    </div>
  );
}

export default App;
