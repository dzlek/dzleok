import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';

import ThrowError from './components/ThrowError/ThrowError';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import Page404 from './components/Page404/Page404';
import CardDetails from './components/CardDetails/CardDetails';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';
import ThemeButton from './components/ThemeButton/ThemeButton';

function App() {
  const { query, updateLocalStorage } = useLocalStorage();

  return (
    <Router>
      <ThemeProvider>
        <div className="app">
          <ErrorBoundary
            fallback={<h1>Something went wrong. Reload the page</h1>}
          >
            <ThemeButton />
            <ThrowError />
            <Search onSearch={updateLocalStorage} query={query} />
            <Routes>
              <Route path="/" element={<Results query={query} />} />
              <Route path="/search/:page" element={<Results query={query} />}>
                <Route path="details/:id" element={<CardDetails />} />
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
