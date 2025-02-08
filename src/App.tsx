import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Results from './components/Results/Results';
import Search from './components/Search/Search';
import { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import ThrowError from './components/ThrowError/ThrowError';

function App() {
  const [query, setQuery] = useState<string>('');
  const { data, loading, error } = useFetch(query);

  return (
    <div className="app">
      <ErrorBoundary fallback={<h1>Something went wrong. Reload the page</h1>}>
        <ThrowError />
        <Search onSearch={setQuery} />
        <Results data={data} loading={loading} error={error} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
