import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Results from './components/Results/Results';
import ThrowError from './components/ThrowError/ThrowError';

function App() {
  return (
    <div className="app">
      <ErrorBoundary fallback={<h1>Something went wrong. Reload the page</h1>}>
        <ThrowError />
        <Header />
        <Results />
      </ErrorBoundary>
    </div>
  );
}

export default App;
