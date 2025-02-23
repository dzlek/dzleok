import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme should be used within ThemeProvider');
  }
  return context;
};
